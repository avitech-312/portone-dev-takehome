
# PortOne DevOps Engineer Take-Home Assignment
This repository contains my implementation of the **PortOne DevOps Engineer take-home assignment**, demonstrating practical skills in:

- ✅ Application containerization with Docker  
- ✅ Centralized logging with Elasticsearch, Filebeat & Kibana (ELK)  
- ✅ Monitoring & observability with Prometheus & Grafana  
- ✅ Infrastructure as Code (IaC) using Docker Compose for one-command deployment  

The entire setup runs **locally** with a single command and requires **no cloud infrastructure**.

---

## 🏗️ Architecture Overview

+------------------+
| Node.js App | ---> JSON logs ---> Filebeat ---> Elasticsearch ---> Kibana
| (Express API) |
| /metrics | ---> Prometheus ---> Grafana dashboards
+------------------+
|
docker-compose (one command setup


portone-devops/
├─ docker-compose.yml
├─ README.md
├─ app/
│ ├─ app.js
│ ├─ package.json
│ └─ Dockerfile
├─ prometheus/
│ └─ prometheus.yml
├─ grafana/
│ └─ provisioning/datasources/datasource.yml
├─ filebeat/
│ └─ filebeat.yml

---

## 🚀 Quick Start

### 1️⃣ Prerequisites

- Docker (20.x+) or Docker Desktop on Windows  
- Docker Compose (v2+)

### 2️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/portone-devops.git
cd portone-devops

docker-compose up --build -d



