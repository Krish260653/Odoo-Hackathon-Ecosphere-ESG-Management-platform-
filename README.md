# EcoSphere: ESG Management Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/11947fe6-0673-4b19-b04c-ec2445b7c8d5/deploy-status)](https://tangerine-dusk-70a19c.netlify.app)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> **EcoSphere** is an enterprise-grade Environmental, Social, and Governance (ESG) Management Platform. It enables organizations to measure, manage, and improve their sustainability performance by integrating operational data, employee participation, and compliance activities into a unified, gamified dashboard.

## 📖 Overview

Environmental, Social, and Governance (ESG) has become a critical aspect of modern businesses. While many ERP systems collect operational data, ESG reporting is often manual, disconnected, and difficult to monitor in real-time. 

EcoSphere solves this by integrating ESG directly into day-to-day operations. It measures sustainability metrics, encourages employee participation through gamification, and provides meaningful reporting for management and compliance.

## ✨ Core Modules

EcoSphere is built around four primary pillars:

* 🌿 **Environmental**: Carbon accounting, emission factors management, sustainability goals tracking, and automated carbon transaction reports.
* 🤝 **Social**: Management of Corporate Social Responsibility (CSR) activities, employee participation tracking, diversity metrics, and safety training engagement.
* ⚖️ **Governance**: Board policy acknowledgments, internal audits, compliance issue tracking, and regulatory alignment disclosures.
* 🏆 **Gamification (Employee Engagement)**: Challenges, automated badge unlocking, XP points, leaderboards, and an integrated rewards redemption store to drive sustainability culture.

## 🚀 Features

* **Real-time Dashboard**: 3D glassmorphism interface displaying aggregate ESG scores across departments.
* **Automated Emission Calculations**: Instantly calculate carbon footprints based on predefined emission factors.
* **Evidence-based CSR**: Employees can log volunteer hours and submit proof for automated/manual approval.
* **Gamification Engine**: Employees earn EcoPoints by participating in ESG challenges (e.g., "Low-Carbon Commute", "Zero-Waste Office Week").
* **Disclosure Reporting**: Generate compliance audits matching GRI, SASB, and internal standard formats (CSV/Excel support).
* **Notification System**: Slide-in notifications for compliance alerts, challenge approvals, and badge unlocks.

## 🛠️ Technology Stack

* **Frontend Framework**: React 18
* **Build Tool**: Vite
* **Styling**: Vanilla CSS3 (Custom Design System, Glassmorphism, CSS Animations)
* **Icons**: Lucide React
* **Data State**: LocalStorage persistence (Mocked backend architecture ready for API integration)
* **Deployment**: Netlify

## ⚙️ Quick Start

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/clever-goodall.git
   cd clever-goodall
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Architecture & Data Model

The application architecture cleanly separates **Master Data** (Departments, Categories, Emission Factors, Goals, Policies, Badges, Rewards) from **Transactional Data** (Carbon Transactions, CSR Activity, Employee Participation, Compliance Issues, Audits).

Currently, data is handled via a robust mock state management system (`mockData.js`) simulating a relational database, making it trivial to swap out with RESTful or GraphQL API endpoints (e.g., Node.js/Express, Python/Django, or Odoo ERP).

## 🔒 Business Rules & Logic

EcoSphere enforces strict corporate logic:
- **Reward Redemption**: Redeeming a reward strictly deducts points from the user balance based on stock availability.
- **Evidence Requirement**: CSR Activities require proof attachments before they can transition to the `Approved` state.
- **Badge Auto-Award**: Badges are programmatically unlocked the moment an employee hits the XP or challenge count threshold.
- **Compliance Ownership**: All compliance discrepancies must have an assigned owner and due date.

## 🤝 Contributing

Contributions are welcome! Please follow the standard fork-and-pull-request workflow.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ for a sustainable future.*
