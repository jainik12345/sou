const db = require("../../config/db");
const nodemailer = require("nodemailer");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Get all active (not soft-deleted)
exports.getGujaratPackageForm = (req, res) => {
  db.query(
    "SELECT * FROM gujarat_package_form WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert new gujarat package form entry
exports.insertGujaratPackageForm = (req, res) => {
  const {
    name,
    email,
    number,
    date,
    gujarat_package_name,
    message,
  } = req.body;

  // Required fields
  if (!name || !email || !number || !date || !gujarat_package_name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const insertQuery = `
    INSERT INTO gujarat_package_form 
      (name, email, number, date, gujarat_package_name, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertQuery,
    [name, email, number, date, gujarat_package_name, message],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      // Send email after successful insert
      const mailOptions = {
        from: `"Statue of Unity" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // send to your own company email
        subject: "New Gujarat Package Form Submission",
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Number:</strong> ${number}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Gujarat Package Name:</strong> ${gujarat_package_name}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      };

      transporter.sendMail(mailOptions, (emailErr, info) => {
        if (emailErr) {
          console.error("Email error:", emailErr.message);
          // Optional: still return success even if email fails
          return res.status(201).json({
            status: "warning",
            message: "Form submitted but email failed",
            id: result.insertId,
          });
        }

        return res.status(201).json({
          status: "success",
          message: "Form submitted and email sent",
          id: result.insertId,
        });
      });
    }
  );
};

// Reply to a gujarat package form
exports.replyToGujaratPackageForm = async (req, res) => {
  const { toEmail, replyMessage } = req.body;

  if (!toEmail || !replyMessage) {
    return res
      .status(400)
      .json({ error: "toEmail and replyMessage are required" });
  }

  const mailOptions = {
    from: `"Statue of Unity" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reply from Statue of Unity",
    html: `<p>${replyMessage}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ status: "success", message: "Reply sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Soft delete
exports.deleteGujaratPackageForm = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE gujarat_package_form SET deleted_at = 1 WHERE id = ?`;
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res
      .status(200)
      .json({ status: "success", message: "Soft deleted successfully" });
  });
};

// Restore soft-deleted form
exports.restoreGujaratPackageForm = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE gujarat_package_form SET deleted_at = 0 WHERE id = ?`;
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res
      .status(200)
      .json({ status: "success", message: "Restored successfully" });
  });
};

// Get trashed (soft-deleted) records
exports.getTrashedGujaratPackageForm = (req, res) => {
  db.query(
    "SELECT * FROM gujarat_package_form WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};