
import "./footer.scss";

const Footer = ({ label, link }) => (
    <div className="footer">
      <label className="footer__label" onClick={()=>window.open(link)}>{label}</label>
    </div>
);

export default Footer;
