import { NavBar } from '@/components/controls/Navbar/NavBar';
import { Footer } from '@/components/controls/Footer';
import { Pill, PillDotIcon } from '@/components/controls/Pill';
import { JoinWaitlistForm } from '@/components/JoinWaitlistForm';
import { Card } from '@/components/elements/Card';
import styles from '@/app/(home)/page.module.scss';
import {
  BookOpen,
  Building2,
  Check,
  GraduationCap,
  Layers,
  Rocket,
  Users,
} from 'lucide-react';

const audienceCards = [
  {
    icon: <GraduationCap />,
    title: 'Students',
    description: [
      'Your personalized learning companion that adapts to your unique style. Track assignments, monitor progress, and achieve your academic goals with AI-powered insights.',
      'Smart scheduling, collaborative tools, and real-time feedback help you stay organized and excel in every subject.',
    ],
    tags: ['Task Management', 'Study Planner', 'Progress Tracking', 'AI Tutor'],
    ctaText: 'Find out more',
    ctaHref: '/students',
  },
  {
    icon: <BookOpen />,
    title: 'Teachers',
    description: [
      'Streamline your classroom management with powerful tools forlesson planning, grading, and student engagement. Create, assign, and track assignments effortlessly.',
      'Gain deep insights into student performance, communicate with parents seamlessly, and focus more on teaching, less on administration.',
    ],
    tags: ['Lesson Builder', 'Grade Book', 'Analytics', 'Communication'],
    ctaText: 'Find out more',
    ctaHref: '/teachers',
  },
  {
    icon: <Building2 />,
    title: 'Schools',
    description: [
      'Empower your institution with a unified platform that connects every classroom, department, and family. Monitor school-wide performance and streamline administrative workflows.',
      'From enrolment to reporting, manage everything in one place with real-time data and compliance-ready tools built for modern education.',
    ],
    tags: ['Admin Portal', 'Enrolment', 'Reporting', 'Staff Management'],
    ctaText: 'Find out more',
    ctaHref: '/schools',
  },
  {
    icon: <Users />,
    title: 'Parents',
    description: [
      "Stay connected to your child's education like never before. Get real-time updates on assignments, attendance, and progress without having to chase down reports.",
      "Communicate directly with teachers, celebrate milestones, and support your child's learning journey from wherever you are.",
    ],
    tags: ['Progress Reports', 'Attendance', 'Messaging', 'Milestone Tracking'],
    ctaText: 'Find out more',
    ctaHref: '/parents',
  },
];

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
        <Pill title="Join Waitlist" icon={<Rocket />} variant="accent" />
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
      <section className={styles.benefitSection}>
        <div className={styles.benefitHeader}>
          <Pill variant="overlay" title="Platform Overview" icon={<Layers />} />
          <h1>Built for Every Learning Journey</h1>
          <p>
            Explore tailored dashboards and tools designed specifically for
            students, teachers, schools, and parents. Each experience is crafted
            to empower your unique role in education.
          </p>
        </div>
        <div className={styles.cardGrid}>
          {audienceCards.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
