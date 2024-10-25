import { Footer as FbFooter } from "flowbite-react";

const Footer = () => {
  return (
    <FbFooter container className="bg-slate-600 dark:bg-gray-900 dark:text-white">
      <div className="flex justify-center w-full">
        <FbFooter.Copyright
          href="#"
          by="Liza Sokolova"
          year={2024}
          className="text-slate-100"
        />
      </div>
    </FbFooter>
  );
};

export default Footer;
