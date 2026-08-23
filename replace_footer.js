const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Remove the old footer CSS override
const cssStart = html.indexOf('/* FIX FOOTER COLUMN OVERLAPPING (Scale fonts and enforce Flexbox grid) */');
const cssEnd = html.indexOf('/* MAKE CONTENT CONTAINERS TRANSPARENT TO REVEAL THE BACKGROUND */');
if (cssStart !== -1 && cssEnd !== -1) {
    html = html.substring(0, cssStart) + html.substring(cssEnd);
}

// 2. Remove the old Elementor footer
const footerStart = html.indexOf('<footer data-elementor-type=\"footer\"');
const footerEnd = html.indexOf('</footer>', footerStart) + 9;

const newFooterHtml = `
<style>
/* Clean HM SOLUTIONS Footer CSS */
.hm-custom-footer {
    background: transparent;
    padding: 60px 20px;
    max-width: 1200px;
    margin: 0 auto;
    font-family: 'Inter', sans-serif;
    color: #0A2540;
}
.hm-custom-footer-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
}
@media (max-width: 1024px) {
    .hm-custom-footer-grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
}
@media (max-width: 767px) {
    .hm-custom-footer-grid { grid-template-columns: 1fr; }
}
.hm-footer-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.hm-footer-col h4 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0 0 5px 0;
}
.hm-footer-col p {
    font-size: 14px;
    line-height: 1.6;
    color: #0A2540;
    margin: 0;
}
.hm-footer-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.hm-footer-col ul li a {
    text-decoration: none;
    color: #0A2540;
    font-size: 14px;
    transition: color 0.3s;
}
.hm-footer-col ul li a:hover {
    color: #0A5C36;
}
.hm-footer-icon-text {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 14px;
    color: #0A2540;
    text-decoration: none;
}
.hm-footer-icon-text svg {
    width: 16px;
    height: 16px;
    fill: #0A5C36;
    flex-shrink: 0;
    margin-top: 3px;
}
.hm-footer-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #0A5C36;
    color: #FFFFFF !important;
    padding: 12px 20px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: background-color 0.3s;
}
.hm-footer-btn svg {
    width: 16px; height: 16px; fill: #FFFFFF; margin-right: 8px;
}
.hm-footer-btn:hover {
    background-color: #064025;
}
.hm-footer-socials {
    display: flex;
    gap: 15px;
}
.hm-footer-socials a svg {
    width: 20px;
    height: 20px;
    fill: #0A2540;
    transition: fill 0.3s;
}
.hm-footer-socials a:hover svg {
    fill: #0A5C36;
}
.hm-footer-bottom {
    margin-top: 60px;
    padding-top: 30px;
    border-top: 1px solid rgba(10, 37, 64, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
}
.hm-footer-bottom p {
    font-size: 13px;
    line-height: 1.6;
    color: #0A2540;
}
.hm-footer-bottom-links {
    display: flex;
    gap: 20px;
}
.hm-footer-bottom-links a {
    color: #0A2540;
    text-decoration: none;
    font-size: 13px;
}
.hm-footer-bottom-links a:hover {
    color: #0A5C36;
}
</style>

<footer class="hm-custom-footer">
    <div class="hm-custom-footer-grid">
        <div class="hm-footer-col">
            <img src="/images/logo_transparent.png" alt="HM SOLUTIONS" style="max-width: 220px; height: auto;" />
            <p>Premium Healthcare Websites and Medical Marketing for Doctors, Dentists, Surgeons, Med Spas and more in Hamilton, the Greater Toronto Area, &amp; across Canada.</p>
            <div class="hm-footer-socials">
                <a href="https://www.linkedin.com/company/hm-solutions" target="_blank"><svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg></a>
                <a href="http://instagram.com/hmsolutions" target="_blank"><svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></a>
            </div>
            <a class="hm-footer-btn" href="https://hmsolutions.ca/contact-us/">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"></path></svg>
                Talk With an Expert
            </a>
        </div>
        <div class="hm-footer-col">
            <h4>Contact Info</h4>
            <a href="tel:5551234567" class="hm-footer-icon-text">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path></svg>
                (555) 123-4567
            </a>
            <a href="mailto:hello@hmsolutions.ca" class="hm-footer-icon-text">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
                hello@hmsolutions.ca
            </a>
            <div class="hm-footer-icon-text">
                <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>
                Hamilton and the Greater Toronto Area, Canada.
            </div>
        </div>
        <div class="hm-footer-col">
            <h4>Navigation</h4>
            <ul>
                <li><a href="https://hmsolutions.ca">Home</a></li>
                <li><a href="https://hmsolutions.ca/contact-us">Contact HM SOLUTIONS</a></li>
                <li><a href="https://hmsolutions.ca/resources/">Blogs &amp; Resources</a></li>
            </ul>
            <h4 style="margin-top: 15px;">Specialized Marketing</h4>
            <ul>
                <li><a href="https://hmsolutions.ca">Doctor Marketing Agency</a></li>
                <li><a href="https://hmsolutions.ca/chiropractor-marketing-agency-and-web-design/">Chiropractor Marketing</a></li>
                <li><a href="https://hmsolutions.ca/dental-marketing-agency/">Dental Marketing</a></li>
                <li><a href="https://hmsolutions.ca/home-care-marketing-agency/">Home Care Marketing</a></li>
                <li><a href="https://hmsolutions.ca/bariatric-marketing-agency/">Bariatric Marketing</a></li>
                <li><a href="https://hmsolutions.ca/pharmacy-marketing-agency/">Pharmacy Marketing Agency</a></li>
                <li><a href="https://hmsolutions.ca/pediatric-dental-marketing-agency/">Pediatric Dental Marketing Agency</a></li>
                <li><a href="https://hmsolutions.ca/medical-doctor-marketing-primary-care-physician-marketing/">Primary Care Physician / Medical Doctor Marketing</a></li>
                <li><a href="https://hmsolutions.ca/fertility-clinic-digital-marketing/">Fertility Clinic Marketing</a></li>
                <li><a href="https://hmsolutions.ca/orthopedic-marketing-agency/">Orthopedic Marketing Agency</a></li>
                <li><a href="https://hmsolutions.ca/mental-health-marketing-agency/">Mental Health Marketing Agency</a></li>
                <li><a href="https://hmsolutions.ca/pain-management-marketing-agency/">Pain Management Marketing Agency</a></li>
                <li><a href="https://hmsolutions.ca/urology-marketing-agency/">Urology Marketing Agency</a></li>
                <li><a href="https://hmsolutions.ca/naturopathic-marketing-agency/">Naturopathic Marketing Agency</a></li>
                <li><a href="https://hmsolutions.ca/ophthalmology-eye-surgery-marketing-agency/">Ophthalmology &amp; Eye Surgery Marketing Agency</a></li>
                <li><a href="https://hmsolutions.ca/private-clinic-marketing-agency/">Marketing for Private Clinics</a></li>
            </ul>
        </div>
        <div class="hm-footer-col">
            <h4>Medical Marketing Services</h4>
            <ul>
                <li><a href="https://hmsolutions.ca/medical-website-design/">Medical Website Design</a></li>
                <li><a href="https://hmsolutions.ca/medical-seo/">Medical SEO</a></li>
                <li><a href="https://hmsolutions.ca/medical-ppc/">Medical Pay-Per-Click</a></li>
                <li><a href="https://hmsolutions.ca/healthcare-social-media-marketing/">Medical Social Media</a></li>
            </ul>
            <h4 style="margin-top: 15px;">Specialized Web Design</h4>
            <ul>
                <li><a href="https://hmsolutions.ca/chiropractor-website-design/">Chiropractor Web Design</a></li>
                <li><a href="https://hmsolutions.ca/medical-spa-website-design/">Medical Spa Web Design</a></li>
                <li><a href="https://hmsolutions.ca/home-care-website-design/">Home Care Web Design</a></li>
                <li><a href="https://hmsolutions.ca/chiropractic-seo/">Chiropractor SEO</a></li>
                <li><a href="https://hmsolutions.ca/dental-seo/">Dental SEO</a></li>
            </ul>
        </div>
    </div>
    
    <div class="hm-footer-bottom">
        <svg style="width: 24px; height: 24px; fill: #0A5C36;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"></path></svg>
        <p><b>We're yours, Canada!</b> Proud to provide Canadian healthcare providers and clinics with medical marketing in and around: Toronto, Mississauga, Hamilton, Burlington, Oakville, Markham, Windsor, Vaughan, Ottawa, Brampton, Richmond Hill, and Niagara Falls, <b>Ontario</b> | Montreal, Laval, Quebec City, and Gatineau, <b>Quebec</b> | Calgary and Edmonton, <b>Alberta</b> | Vancouver, Surrey, Burnaby, Victoria, and Kelowna, <b>British Columbia</b> | Winnipeg, <b>Manitoba</b> | Halifax, <b>Nova Scotia</b> | Regina, <b>Saskatchewan</b></p>
        <img width="200" src="https://hmsolutions.ca/wp-content/uploads/2024/06/phipa-1.png" alt="PHIPA Compliant" />
        <div class="hm-footer-bottom-links">
            <a href="https://hmsolutions.ca/terms-conditions/">Terms &amp; Conditions</a>
            <a href="https://hmsolutions.ca/privacy-policy/">Privacy Policy</a>
        </div>
    </div>
</footer>
`;

if (footerStart !== -1 && footerEnd !== -1) {
    html = html.substring(0, footerStart) + newFooterHtml + html.substring(footerEnd);
    fs.writeFileSync('public/index.html', html);
    console.log('Footer completely replaced with clean custom CSS Grid layout!');
} else {
    console.error('Could not find footer tags.');
}
