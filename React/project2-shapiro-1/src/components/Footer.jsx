import { useEffect, useState } from 'react';
import getData from '../util/GetData';
import './Footer.css';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    getData('footer/')
    .then((data) => setFooterData(data));
  }, []);

  if (!footerData) return null;

  const { social, quickLinks, copyright, news } = footerData;

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Quick Links */}
          {quickLinks && (
            <div className="col-md-4 mb-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} target="_blank" rel="noreferrer" className="footer-link">{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social */}
          {social && (
            <div className="col-md-4 mb-3">
              <h5>{social.title}</h5>
              <p>"{social.tweet}"</p>
              <p><em>{social.by}</em></p>
              <ul className="list-unstyled">
                {social.twitter && (
                  <li>
                    <a href={social.twitter} target="_blank" rel="noreferrer" className="footer-link">Twitter</a>
                  </li>
                )}
                {social.facebook && (
                  <li>
                    <a href={social.facebook} target="_blank" rel="noreferrer" className="footer-link">Facebook</a>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* News */}
          {news && (
            <div className="col-md-4 mb-3">
              <h5>News</h5>
              <a href={news} target="_blank" rel="noreferrer" className="footer-link">RIT News</a>
            </div>
          )}
        </div>

        {/* Copyright */}
        {copyright?.html && (
          <div
            className="text-center mt-4"
            style={{ fontSize: '0.9rem', color: '#777' }}
            dangerouslySetInnerHTML={{ __html: copyright.html }}
          />
        )}
      </div>
    </footer>
  );
};

export default Footer;
