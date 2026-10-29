export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl font-bold mb-2">SurroSantara Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Effective Date: [Insert Date]
        </p>

        <p className="mb-6">
          SurroSantara values your privacy.
        </p>
        <p className="mb-8">
          Because our Platform handles highly sensitive fertility and medical
          information, protecting your data is one of our highest priorities.
        </p>

        <Section title="1. Information We Collect">
          <p>We may collect:</p>
          <p className="font-semibold mt-2">Personal Information</p>
          <ul>
            <li>Name</li>
            <li>Date of birth</li>
            <li>Email</li>
            <li>Phone number</li>
            <li>Address</li>
            <li>Government identification</li>
            <li>Profile photo</li>
          </ul>
          <p className="font-semibold mt-2">Medical Information</p>
          <p className="text-sm italic">Where voluntarily provided:</p>
          <ul>
            <li>Pregnancy history</li>
            <li>Fertility history</li>
            <li>Blood group</li>
            <li>Genotype</li>
            <li>Medical reports</li>
            <li>Ultrasound reports</li>
            <li>Medications</li>
            <li>Allergies</li>
            <li>Laboratory results</li>
          </ul>
          <p className="font-semibold mt-2">Professional Information</p>
          <p className="text-sm italic">For clinics, lawyers and agents:</p>
          <ul>
            <li>licences;</li>
            <li>certifications;</li>
            <li>organisation details;</li>
            <li>experience;</li>
            <li>practice locations.</li>
          </ul>
          <p className="font-semibold mt-2">Financial Information</p>
          <p>We may collect:</p>
          <ul>
            <li>wallet transactions;</li>
            <li>payment references;</li>
            <li>subscription history;</li>
            <li>invoices.</li>
          </ul>
          <p>We do not store full payment card details.</p>
          <p className="font-semibold mt-2">Device Information</p>
          <p>Including:</p>
          <ul>
            <li>device type;</li>
            <li>operating system;</li>
            <li>browser;</li>
            <li>IP address;</li>
            <li>app version;</li>
            <li>crash reports.</li>
          </ul>
        </Section>

        <Section title="2. How We Use Information">
          <p>We use data to:</p>
          <ul>
            <li>create accounts;</li>
            <li>verify identities;</li>
            <li>facilitate matching;</li>
            <li>process payments;</li>
            <li>improve Platform safety;</li>
            <li>detect fraud;</li>
            <li>provide customer support;</li>
            <li>personalise user experience;</li>
            <li>comply with legal obligations.</li>
          </ul>
        </Section>

        <Section title="3. Medical Data">
          <p>Medical information receives enhanced protection.</p>
          <p>We process medical information only:</p>
          <ul>
            <li>with your consent;</li>
            <li>where necessary to provide requested services;</li>
            <li>to comply with legal obligations.</li>
          </ul>
          <p>
            Medical documents are not made publicly available.
          </p>
        </Section>

        <Section title="4. Who Can View Your Information">
          <p>Depending on your privacy settings:</p>
          <p>
            Surrogate profiles may be viewed by intended parents, verified
            agents, clinics, or lawyers.
          </p>
          <p>
            Contact information and sensitive documents may remain locked until
            authorised through Platform workflows.
          </p>
        </Section>

        <Section title="5. Payments">
          <p>
            Payments are processed securely through authorised payment
            providers.
          </p>
          <p>
            SurroSantara does not store complete payment card numbers.
          </p>
        </Section>

        <Section title="6. Data Sharing">
          <p>We do not sell personal information.</p>
          <p>We may share information with:</p>
          <ul>
            <li>payment providers;</li>
            <li>identity verification providers;</li>
            <li>cloud hosting providers;</li>
            <li>customer support services;</li>
            <li>law enforcement where legally required.</li>
          </ul>
        </Section>

        <Section title="7. Data Security">
          <p>
            We implement industry-standard security measures including:
          </p>
          <ul>
            <li>encryption in transit (TLS);</li>
            <li>encrypted storage where appropriate;</li>
            <li>secure authentication;</li>
            <li>access controls;</li>
            <li>activity monitoring;</li>
            <li>regular security updates.</li>
          </ul>
          <p>
            While we strive to protect your information, no internet
            transmission or storage system is completely secure.
          </p>
        </Section>

        <Section title="8. Data Retention">
          <p>
            We retain personal information only as long as necessary to:
          </p>
          <ul>
            <li>provide services;</li>
            <li>comply with legal obligations;</li>
            <li>resolve disputes;</li>
            <li>enforce agreements.</li>
          </ul>
          <p>
            Certain financial and transaction records may be retained for longer
            periods where required by law.
          </p>
        </Section>

        <Section title="9. Your Rights">
          <p>Subject to applicable law, you may:</p>
          <ul>
            <li>access your information;</li>
            <li>correct inaccurate information;</li>
            <li>update your profile;</li>
            <li>request deletion;</li>
            <li>withdraw consent;</li>
            <li>object to certain processing;</li>
            <li>request a copy of your data where applicable.</li>
          </ul>
        </Section>

        <Section title="10. Children's Privacy">
          <p>
            The Platform is intended only for adults aged 18 years and older.
          </p>
          <p>
            We do not knowingly collect personal information from children.
          </p>
        </Section>

        <Section title="11. Cookies and Analytics">
          <p>
            Our website may use cookies and similar technologies to:
          </p>
          <ul>
            <li>remember preferences;</li>
            <li>improve performance;</li>
            <li>understand usage patterns;</li>
            <li>enhance security.</li>
          </ul>
          <p>
            You may manage cookie preferences through your browser settings
            where applicable.
          </p>
        </Section>

        <Section title="12. International Data Transfers">
          <p>
            Where necessary, information may be processed in countries other
            than your own.
          </p>
          <p>
            We take reasonable measures to ensure appropriate safeguards are in
            place for cross-border data transfers.
          </p>
        </Section>

        <Section title="13. Account Deletion">
          <p>You may request deletion of your account.</p>
          <p>
            Certain records may be retained where required by law, for fraud
            prevention, or to resolve legal disputes.
          </p>
        </Section>

        <Section title="14. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time.</p>
          <p>
            Material changes will be communicated through the Platform or by
            other appropriate means.
          </p>
        </Section>

        <Section title="15. Contact Us">
          <p>
            If you have questions about this Privacy Policy or your personal
            information, contact:
          </p>
          <div className="mt-2">
            <p>SurroSantara Support</p>
            <p>Email: support@surrosantara.com</p>
            <p>Website: https://surrosantara.com</p>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="space-y-3 text-muted-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_p]:mb-2">
        {children}
      </div>
    </section>
  );
}
