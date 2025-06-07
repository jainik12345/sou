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
exports.getContactForm = (req, res) => {
  db.query(
    "SELECT * FROM contact_form WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert new contact form entry
exports.insertContactForm = (req, res) => {
  const {
    Name,
    Email,
    Number,
    City,
    NumberOfPerson,
    NumberOfChild,
    Date,
    NumberOfNights,
    Resort,
    Message,
  } = req.body;

  // Required fields can be adjusted as per your needs
  if (!Name || !Email || !Number) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const insertQuery = `
    INSERT INTO contact_form 
      (Name, Email, Number, City, NumberOfPerson, NumberOfChild, Date, NumberOfNights, Resort, Message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertQuery,
    [
      Name,
      Email,
      Number,
      City,
      NumberOfPerson,
      NumberOfChild,
      Date,
      NumberOfNights,
      Resort,
      Message,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      // Send email after successful insert
      const mailOptions = {
        from: `"Compass Tourism" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // send to your own company email
        subject: "New Contact Form Submission",
        html: `
          <p><strong>Name:</strong> ${Name}</p>
          <p><strong>Email:</strong> ${Email}</p>
          <p><strong>Number:</strong> ${Number}</p>
          <p><strong>City:</strong> ${City}</p>
          <p><strong>Number Of Person:</strong> ${NumberOfPerson}</p>
          <p><strong>Number Of Child:</strong> ${NumberOfChild}</p>
          <p><strong>Date:</strong> ${Date}</p>
          <p><strong>Number Of Nights:</strong> ${NumberOfNights}</p>
          <p><strong>Resort:</strong> ${Resort}</p>
          <p><strong>Message:</strong> ${Message}</p>
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

// Reply to a contact form
exports.replyToContactForm = async (req, res) => {
  const { toEmail, replyMessage } = req.body;

  if (!toEmail || !replyMessage) {
    return res
      .status(400)
      .json({ error: "toEmail and replyMessage are required" });
  }

  const mailOptions = {
    from: `"Compass Tourism" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reply from Support Team",
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
exports.deleteContactForm = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE contact_form SET deleted_at = 1 WHERE id = ?`;
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res
      .status(200)
      .json({ status: "success", message: "Soft deleted successfully" });
  });
};

// Restore soft-deleted form
exports.restoreContactForm = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE contact_form SET deleted_at = 0 WHERE id = ?`;
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res
      .status(200)
      .json({ status: "success", message: "Restored successfully" });
  });
};

// Get trashed (soft-deleted) records
exports.getTrashedContactForm = (req, res) => {
  db.query(
    "SELECT * FROM contact_form WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};
