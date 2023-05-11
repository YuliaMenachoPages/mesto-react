import headerLogo from "../header-logo.svg";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__logo">&copy; {new Date().getFullYear()} Mesto Russia</p>
        </footer>
    )
}

export default Footer;