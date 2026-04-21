import { NavBar } from '@/components/controls/Navbar/NavBar';
import { Pill, PillDotIcon } from '@/components/controls/Pill';
import { JoinWaitlistForm } from '@/components/JoinWaitlistForm';
import styles from '@/app/(home)/page.module.scss';
import { Check, Rocket } from 'lucide-react';

const waitlistBenefits = [
  'No credit card required',
  'Waitlist priority',
  'Exclusive beta features',
];

export default function HomePage() {
  return (
    <main>
      <NavBar />
      <section className={styles.mainTitle}>
        <Pill
          title="Introducing Craftyverse OS"
          icon={<PillDotIcon color="#fa8673" />}
        />
        <h1 className={styles.headline}>
          The all-inclusive learning operating system
        </h1>
        <p className={styles.supportingText}>
          A personalised companion connecting students, teachers, parents, and
          schools into one seamless daily workflow.
        </p>
        <Pill title="Join Waitlist" icon={<Rocket />} variant="waitlist" />
        <h2 className={styles.journeyTitle}>
          Start your journey to academic excellence
        </h2>
        <p className={styles.journeyText}>
          Join the waitlist for early access to Craftyverse. Be among the first
          to experience a more connected way to learn, plan, and grow.
        </p>
        <div className={styles.waitlistFormLayer}>
          <JoinWaitlistForm />
        </div>
        <div className={styles.waitlistDivider} aria-hidden="true" />
        <ul
          className={styles.waitlistBenefitsContainer}
          aria-label="Waitlist benefits"
        >
          {waitlistBenefits.map((benefit) => (
            <li key={benefit} className={styles.waitlistBenefit}>
              <span className={styles.waitlistBenefitIcon}>
                <Check
                  aria-hidden="true"
                  className={styles.waitlistBenefitIcon}
                />
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
