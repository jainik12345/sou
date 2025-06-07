import { useParams } from 'react-router-dom';
import { Banner } from '../../../../components/Banner/Banner'; 

export const GujaratPackagesDropDownBanner = () => {
  const { GujaratPath } = useParams();

  if (!GujaratPath) return null;

  const title = GujaratPath
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div>
      <Banner Title={title} />
    </div>
  );
};