import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

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

const repos = [
  {
    name: 'pivot-core',
    description: 'Backend — Java 25 · Spring Boot 4.x · PostgreSQL 18 · Flyway · Redis',
    href: 'https://github.com/PIVOT-PLATFORM/pivot-core',
  },
  {
    name: 'pivot-ui',
    description: 'Frontend — Angular 22 · TypeScript strict · Vitest · Playwright',
    href: 'https://github.com/PIVOT-PLATFORM/pivot-ui',
  },
  {
    name: 'pivot-docs',
    description: 'Ce site — documentation plateforme',
    href: 'https://github.com/PIVOT-PLATFORM/pivot-docs',
  },
];

const modules = [
  { name: 'Whiteboard', description: 'Tableau blanc collaboratif temps réel' },
  { name: 'Session', description: 'Sessions live : quiz, sondage, nuage de mots, brainstorm, Q&A' },
  { name: 'Roadmap', description: 'Roadmap / Gantt intégré' },
  { name: 'Survey', description: 'Système de sondage' },
  { name: 'Quiz', description: 'Quiz interactif gamifié' },
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
      description="Documentation générale de la suite collaborative PIVOT, projet open source AGPL-3.0"
    >
      <header className={styles.heroBanner}>
        <div className="container">
          <div className={styles.heroTags}>
            <Tag severity="success" icon="pi pi-github" value="Open source" />
            <Tag severity="info" value="AGPL-3.0" />
          </div>
          <Heading as="h1" className={styles.heroTitle}>
            PIVOT
          </Heading>
          <p className={styles.heroSubtitle}>
            La suite collaborative <strong>auto-hébergeable</strong>, pensée pour les
            associations, TPE/PME et entreprises qui veulent garder la main sur leurs données.
          </p>
          <div className={styles.heroActions}>
            <a href="https://github.com/PIVOT-PLATFORM" target="_blank" rel="noopener noreferrer">
              <Button label="Voir l'organisation GitHub" icon="pi pi-github" outlined />
            </a>
            <a href="https://github.com/PIVOT-PLATFORM/pivot-docs/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
              <Button label="Licence AGPL-3.0" icon="pi pi-book" text />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.about}>
          <div className="container">
            <Heading as="h2">Pourquoi PIVOT ?</Heading>
            <p className={styles.aboutText}>
              PIVOT est développé en <strong>open source sous licence AGPL-3.0</strong> :
              le code reste public, auditable, et toute modification déployée en service
              doit être reversée à la communauté. La plateforme repose sur un système de{' '}
              <strong>modules activables individuellement</strong> par organisation (tenant),
              pour ne payer et n'héberger que ce dont on a besoin.
            </p>

            <div className={styles.moduleGrid}>
              {modules.map((m) => (
                <div key={m.name} className={styles.moduleItem}>
                  <Tag value={m.name} rounded />
                  <span>{m.description}</span>
                </div>
              ))}
            </div>

            <div className={styles.repoGrid}>
              {repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoCard}
                >
                  <code>{repo.name}</code>
                  <span>{repo.description}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sections}>
          <div className="container">
            <Heading as="h2">Documentation</Heading>
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
