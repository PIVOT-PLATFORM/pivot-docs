import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

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
  const history = useHistory();
  const url = useBaseUrl(`/${id}`);

  return (
    <div className={styles.cardCol}>
      <Card title={title} className={styles.card}>
        <p>{description}</p>
        <Button
          label="Explorer"
          icon="pi pi-arrow-right"
          iconPos="right"
          text
          onClick={() => history.push(url)}
        />
      </Card>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="Accueil"
      description="Documentation générale de la suite collaborative PIVOT"
    >
      <header className={styles.heroBanner}>
        <div className="container">
          <Heading as="h1" className={styles.heroTitle}>
            PIVOT Docs
          </Heading>
          <p className={styles.heroSubtitle}>
            Documentation générale de la suite collaborative <strong>PIVOT</strong>
          </p>
        </div>
      </header>
      <main>
        <section className={styles.sections}>
          <div className="container">
            <div className={styles.cardGrid}>
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
