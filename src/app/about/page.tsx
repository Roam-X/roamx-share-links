import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.logo}>ROAM X</div>
        <div className={styles.content}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.subtitle}>Last Updated: January 9, 2025</p>

          <div className={styles.section}>
            <p>
              Welcome to Roam X, your personalized food exploration app designed
              to make discovering new restaurants and dishes exciting, tailored,
              and hassle-free. Roam X curates recommendations to match your
              unique tastes, dietary needs, and food preferences, all in one
              easy-to-navigate app.
            </p>
          </div>

          <div className={styles.section}>
            <h2>What Makes Roam X Different?</h2>
            <p>
              Roam X stands out with innovative features that make food discovery
              a dynamic experience. Enjoy customized suggestions using our
              powerful AI-backed algorithm that recommends restaurants based on
              your mood and taste preferences.
            </p>
          </div>

          <div className={styles.section}>
            <h2>A User-Centered Experience</h2>
            <p>
              We built Roam X with you in mind. With seamless navigation, Roam X
              puts you in control. Refine your search by cuisine, dietary
              restrictions, price range, and location to find the perfect option
              every time.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Our Commitment</h2>
            <p>
              We built Roam X with you in mind. From seamless navigation to easy
              accessible filters, Roam X puts you in control. Refine your search
              by cuisine, dietary restrictions, price range, and location to find
              the perfect option every time.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Our Mission</h2>
            <p>
              At Roam X, our mission is to enrich your food discovery journey by
              connecting you with dishes and dining spots that match your
              personal tastes, helping you make confident and satisfying dining
              choices.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
