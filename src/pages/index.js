import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const sections = [
  {
    id: 'architecture',
    title: 'Architecture',
    description: "Architecture cible de la plateforme (vue d'ensemble, modules, auth).",
  },
  {
    id: 'adr',
    title: 'ADR',
    description: 'Architecture Decision Records — décisions techniques structurantes.',
  },
  {
    id: 'cicd',
    title: 'CI/CD',
    description: 'Pipelines CI/CD de pivot-core et pivot-ui.',
  },
  {
    id: 'audits',
    title: 'Audits',
    description: 'Audits par domaine (cyber, QA, RGPD, UX…).',
  },
  {
    id: 'backlog',
    title: 'Backlog',
    description: 'Modèle de backlog — hiérarchie, champs, workflow draft → Issue.',
  },
  {
    id: 'workflow',
    title: 'Workflow',
    description: 'Workflow agentique PIVOT (ACDD) — cycle de développement assisté.',
  },
];

function SectionCard({ id, title, description }) {
  return (
    <div className={clsx('col col--4', styles.cardCol)}>
      <Link to={`/${id}/`} className={styles.card}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="Accueil"
      description="Documentation générale de la suite collaborative PIVOT"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            PIVOT Docs
          </Heading>
          <p className="hero__subtitle">
            Documentation générale de la suite collaborative <strong>PIVOT</strong>
          </p>
        </div>
      </header>
      <main>
        <section className={styles.sections}>
          <div className="container">
            <div className="row">
              {sections.map((section) => (
                <SectionCard key={section.id} {...section} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
