export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl font-bold mb-2">SurroSantara Terms of Use</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Effective Date: [Insert Date]
        </p>

        <p className="mb-6">
          Welcome to SurroSantara (&ldquo;Surro&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;).
        </p>
        <p className="mb-6">
          These Terms of Use govern your access to and use of the SurroSantara
          mobile application, website, and related services (collectively, the
          &ldquo;Platform&rdquo;). By creating an account or using our services, you agree
          to these Terms.
        </p>
        <p className="mb-8">
          If you do not agree, please do not use the Platform.
        </p>

        <Section title="1. About SurroSantara">
          <p>
            SurroSantara is a digital platform designed to connect:
          </p>
          <ul>
            <li>Intended Parents</li>
            <li>Surrogate Mothers</li>
            <li>Fertility Clinics</li>
            <li>Licensed Lawyers</li>
            <li>Agencies and Caregivers</li>
          </ul>
          <p>
            Our Platform helps users discover, communicate, manage profiles,
            access educational resources, and facilitate professional connections
            related to fertility and surrogacy.
          </p>
          <p>
            SurroSantara does not provide medical treatment, legal
            representation, psychological counselling, or guarantee surrogacy
            outcomes.
          </p>
        </Section>

        <Section title="2. Eligibility">
          <p>You must:</p>
          <ul>
            <li>Be at least 18 years old.</li>
            <li>Have legal capacity to enter contracts.</li>
            <li>Provide truthful registration information.</li>
            <li>Use the Platform only where surrogacy-related services are lawful.</li>
          </ul>
          <p>We may request identity verification at any time.</p>
        </Section>

        <Section title="3. Account Registration">
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate information.</li>
            <li>Keep your password secure.</li>
            <li>Notify us immediately of unauthorized account access.</li>
            <li>Maintain updated contact information.</li>
          </ul>
          <p>You are responsible for all activity occurring under your account.</p>
        </Section>

        <Section title="4. User Roles">
          <p>
            Different services are available depending on your account type:
          </p>
          <ul>
            <li>Intended Parent</li>
            <li>Surrogate Mother</li>
            <li>Fertility Clinic</li>
            <li>Lawyer</li>
            <li>Agency/Caregiver</li>
          </ul>
          <p>
            Some services require identity verification before becoming
            available.
          </p>
        </Section>

        <Section title="5. Identity Verification">
          <p>To protect users, we may verify:</p>
          <ul>
            <li>Government-issued identification</li>
            <li>Selfie verification</li>
            <li>Medical documentation</li>
            <li>Professional licences</li>
            <li>Clinic registration</li>
            <li>Agency credentials</li>
          </ul>
          <p>Verification does not guarantee suitability or legal compliance.</p>
        </Section>

        <Section title="6. Medical Information">
          <p>Some users may upload:</p>
          <ul>
            <li>Medical reports</li>
            <li>Laboratory results</li>
            <li>Blood group</li>
            <li>Genotype</li>
            <li>Fertility records</li>
            <li>Pregnancy history</li>
            <li>Ultrasound records</li>
          </ul>
          <p>
            These documents remain confidential and are only shared according to
            user permissions and Platform functionality.
          </p>
          <p>
            Users warrant that all uploaded medical information is truthful.
          </p>
        </Section>

        <Section title="7. Professional Services Disclaimer">
          <p>SurroSantara is not:</p>
          <ul>
            <li>a fertility clinic;</li>
            <li>a hospital;</li>
            <li>a legal practice;</li>
            <li>a psychological service;</li>
            <li>a medical institution.</li>
          </ul>
          <p>
            Healthcare and legal decisions should always be made with qualified
            professionals.
          </p>
        </Section>

        <Section title="8. Payments">
          <p>
            Some Platform features require payment, including but not limited
            to:
          </p>
          <ul>
            <li>Profile unlocks</li>
            <li>Agent access</li>
            <li>Subscription plans</li>
            <li>Verification badges</li>
            <li>Profile boosts</li>
            <li>Premium visibility</li>
          </ul>
          <p>
            Payments are processed through authorised payment providers.
          </p>
          <p>
            Fees are generally non-refundable unless required by applicable law.
          </p>
        </Section>

        <Section title="9. Wallet">
          <p>Users may maintain a wallet balance.</p>
          <p>Wallet funds may be used for:</p>
          <ul>
            <li>subscriptions;</li>
            <li>profile boosts;</li>
            <li>verification;</li>
            <li>profile unlocks;</li>
            <li>Platform services.</li>
          </ul>
          <p>
            Wallet balances cannot be exchanged for cash unless required by law.
          </p>
          <p>
            We reserve the right to investigate suspicious transactions.
          </p>
        </Section>

        <Section title="10. Communication">
          <p>The Platform includes private messaging.</p>
          <p>Users agree not to:</p>
          <ul>
            <li>harass;</li>
            <li>threaten;</li>
            <li>scam;</li>
            <li>solicit illegal activity;</li>
            <li>share malicious links;</li>
            <li>impersonate others.</li>
          </ul>
          <p>
            We reserve the right to monitor reports of abuse.
          </p>
        </Section>

        <Section title="11. User Content">
          <p>
            Users retain ownership of content they upload, including:
          </p>
          <ul>
            <li>profile photos;</li>
            <li>medical information;</li>
            <li>biographies;</li>
            <li>documents;</li>
            <li>messages.</li>
          </ul>
          <p>
            You grant SurroSantara a limited licence to display and process
            such content solely for providing Platform services.
          </p>
        </Section>

        <Section title="12. Prohibited Conduct">
          <p>Users may not:</p>
          <ul>
            <li>provide false identities;</li>
            <li>upload forged documents;</li>
            <li>impersonate professionals;</li>
            <li>exploit vulnerable persons;</li>
            <li>engage in human trafficking;</li>
            <li>advertise illegal surrogacy arrangements;</li>
            <li>solicit payment outside approved Platform workflows;</li>
            <li>publish another person&rsquo;s confidential information;</li>
            <li>upload malware;</li>
            <li>reverse engineer the Platform.</li>
          </ul>
          <p>
            Violation may result in immediate account suspension.
          </p>
        </Section>

        <Section title="13. Verification Badge">
          <p>
            Verification badges indicate that documentation has been reviewed.
          </p>
          <p>They do not represent:</p>
          <ul>
            <li>medical approval;</li>
            <li>legal approval;</li>
            <li>suitability;</li>
            <li>endorsement.</li>
          </ul>
          <p>
            Users remain responsible for conducting their own due diligence.
          </p>
        </Section>

        <Section title="14. No Guarantee">
          <p>SurroSantara does not guarantee:</p>
          <ul>
            <li>successful matches;</li>
            <li>pregnancies;</li>
            <li>legal eligibility;</li>
            <li>surrogate availability;</li>
            <li>medical outcomes;</li>
            <li>clinic quality;</li>
            <li>user behaviour.</li>
          </ul>
        </Section>

        <Section title="15. Third-Party Services">
          <p>Our Platform may integrate:</p>
          <ul>
            <li>payment processors;</li>
            <li>cloud storage;</li>
            <li>messaging providers;</li>
            <li>identity verification providers.</li>
          </ul>
          <p>
            Their services remain governed by their own terms.
          </p>
        </Section>

        <Section title="16. Intellectual Property">
          <p>
            All Platform software, branding, graphics, logos, databases, and
            content belong to SurroSantara unless otherwise stated.
          </p>
          <p>
            No content may be copied without written permission.
          </p>
        </Section>

        <Section title="17. Suspension">
          <p>We may suspend or terminate accounts that:</p>
          <ul>
            <li>violate these Terms;</li>
            <li>pose safety risks;</li>
            <li>submit fraudulent information;</li>
            <li>engage in abuse;</li>
            <li>violate applicable laws.</li>
          </ul>
        </Section>

        <Section title="18. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, SurroSantara shall not be
            liable for:
          </p>
          <ul>
            <li>medical decisions;</li>
            <li>pregnancy outcomes;</li>
            <li>contractual disputes;</li>
            <li>surrogate agreements;</li>
            <li>clinic negligence;</li>
            <li>lawyer negligence;</li>
            <li>user misconduct;</li>
            <li>indirect or consequential damages.</li>
          </ul>
        </Section>

        <Section title="19. Indemnity">
          <p>
            You agree to indemnify SurroSantara against claims arising from:
          </p>
          <ul>
            <li>misuse of the Platform;</li>
            <li>violation of these Terms;</li>
            <li>violation of applicable laws;</li>
            <li>inaccurate information you provide.</li>
          </ul>
        </Section>

        <Section title="20. Governing Law">
          <p>
            These Terms shall be governed by the laws applicable in the
            jurisdiction where SurroSantara operates, unless mandatory local
            laws require otherwise.
          </p>
        </Section>

        <Section title="21. Changes">
          <p>We may modify these Terms periodically.</p>
          <p>
            Continued use of the Platform constitutes acceptance of revised
            Terms.
          </p>
        </Section>

        <Section title="22. Contact">
          <p>Email: support@surrosantara.com</p>
          <p>Website: https://surrosantara.com</p>
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
