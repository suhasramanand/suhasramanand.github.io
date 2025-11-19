import React, { useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Home, BookOpen } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import CrazyMenu from '@/components/CrazyMenu';
import FloatingActionButton from '@/components/FloatingActionButton';

gsap.registerPlugin(ScrollToPlugin);

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable Cloud Infrastructure with Terraform and Kubernetes',
    excerpt: 'A comprehensive guide to designing and deploying production-ready cloud infrastructure using Infrastructure as Code principles and container orchestration.',
    content: `
      <p class="text-body mb-4">Modern applications demand infrastructure that can scale seamlessly, recover from failures automatically, and adapt to changing requirements. In this guide, we'll explore how to build production-ready cloud infrastructure using Terraform for Infrastructure as Code (IaC) and Kubernetes for container orchestration.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Why Infrastructure as Code?</h2>
      <p class="text-body mb-4">Infrastructure as Code transforms how we manage cloud resources. Instead of manually clicking through cloud consoles, you define your infrastructure in version-controlled configuration files. This approach offers several critical advantages:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Reproducibility:</strong> Deploy identical environments across development, staging, and production</li>
        <li><strong>Version Control:</strong> Track changes, review infrastructure modifications, and roll back when needed</li>
        <li><strong>Collaboration:</strong> Multiple team members can contribute to infrastructure design through code reviews</li>
        <li><strong>Disaster Recovery:</strong> Rebuild entire environments from code in minutes, not days</li>
        <li><strong>Cost Optimization:</strong> Identify unused resources and optimize spending through code analysis</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Terraform Fundamentals</h2>
      <p class="text-body mb-4">Terraform, developed by HashiCorp, uses a declarative configuration language (HCL) to define infrastructure. Here's a basic example of creating an AWS VPC:</p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "production-vpc"
    Environment = "prod"
  }
}</code></pre>
      <p class="text-body mb-4">Terraform's workflow consists of three main commands:</p>
      <ol class="list-decimal list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>terraform init:</strong> Initializes the working directory and downloads provider plugins</li>
        <li><strong>terraform plan:</strong> Creates an execution plan showing what changes will be made</li>
        <li><strong>terraform apply:</strong> Executes the plan and provisions the infrastructure</li>
      </ol>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Kubernetes Architecture Overview</h2>
      <p class="text-body mb-4">Kubernetes orchestrates containers across a cluster of machines. Understanding its core components is essential:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Control Plane:</strong> Manages the cluster state, schedules pods, and handles API requests</li>
        <li><strong>Nodes:</strong> Worker machines that run containerized applications</li>
        <li><strong>Pods:</strong> Smallest deployable units containing one or more containers</li>
        <li><strong>Services:</strong> Stable network endpoints for accessing pods</li>
        <li><strong>Deployments:</strong> Declarative updates for managing pod replicas</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Deploying Kubernetes with Terraform</h2>
      <p class="text-body mb-4">Combining Terraform with managed Kubernetes services like AWS EKS provides the best of both worlds. Here's a practical approach:</p>
      <p class="text-body mb-4"><strong>Step 1: Provision the EKS Cluster</strong></p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>resource "aws_eks_cluster" "main" {
  name     = "production-cluster"
  role_arn = aws_iam_role.cluster.arn
  version  = "1.28"

  vpc_config {
    subnet_ids = aws_subnet.private[*].id
  }

  depends_on = [
    aws_iam_role_policy_attachment.cluster_AmazonEKSClusterPolicy
  ]
}</code></pre>
      <p class="text-body mb-4"><strong>Step 2: Configure Node Groups</strong></p>
      <p class="text-body mb-4">Node groups define the compute capacity for your cluster. Use managed node groups for simplicity or self-managed for more control:</p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "production-nodes"
  node_role_arn   = aws_iam_role.nodes.arn
  subnet_ids      = aws_subnet.private[*].id

  scaling_config {
    desired_size = 3
    max_size     = 10
    min_size     = 2
  }

  instance_types = ["t3.medium"]
}</code></pre>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Best Practices for Production</h2>
      <p class="text-body mb-4">When deploying to production, consider these critical practices:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Multi-AZ Deployment:</strong> Distribute nodes across multiple availability zones for high availability</li>
        <li><strong>Resource Limits:</strong> Set CPU and memory requests/limits for all pods to prevent resource starvation</li>
        <li><strong>Network Policies:</strong> Implement network segmentation to limit pod-to-pod communication</li>
        <li><strong>Secrets Management:</strong> Use Kubernetes secrets or external systems like AWS Secrets Manager</li>
        <li><strong>Monitoring:</strong> Deploy Prometheus and Grafana for metrics, and ELK stack for logging</li>
        <li><strong>Backup Strategy:</strong> Regularly backup etcd and persistent volumes</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Cost Optimization Strategies</h2>
      <p class="text-body mb-4">Cloud infrastructure costs can spiral quickly. Here are proven strategies to optimize spending:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Right-Sizing:</strong> Use cluster autoscaling to match workload demands</li>
        <li><strong>Spot Instances:</strong> Leverage AWS Spot instances for non-critical workloads (up to 90% savings)</li>
        <li><strong>Reserved Instances:</strong> Commit to 1-3 year terms for predictable workloads</li>
        <li><strong>Resource Tagging:</strong> Tag all resources for cost allocation and tracking</li>
        <li><strong>Idle Resource Cleanup:</strong> Automate detection and removal of unused resources</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Conclusion</h2>
      <p class="text-body mb-4">Building scalable cloud infrastructure requires careful planning, the right tools, and adherence to best practices. Terraform provides the foundation for managing infrastructure as code, while Kubernetes enables efficient container orchestration. By combining these technologies and following the practices outlined above, you can build resilient, scalable, and cost-effective cloud infrastructure that supports your application's growth.</p>
      <p class="text-body mb-4">Remember: infrastructure is not a one-time setup but an evolving system. Continuously monitor, optimize, and iterate based on your application's needs and performance metrics.</p>
    `,
    date: '2025-01-20',
    readTime: '12 min read',
    category: 'Cloud',
    author: 'Suhas Reddy'
  },
  {
    id: '2',
    title: 'Site Reliability Engineering: From Theory to Practice',
    excerpt: 'Understanding SRE principles, error budgets, and how to implement reliability practices that balance innovation with operational stability.',
    content: `
      <p class="text-body mb-4">Site Reliability Engineering (SRE) emerged from Google's need to balance the velocity of software development with the reliability requirements of large-scale systems. Today, SRE has become a critical discipline for organizations running production systems at scale. This post explores SRE fundamentals and practical implementation strategies.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">What is Site Reliability Engineering?</h2>
      <p class="text-body mb-4">SRE is what happens when you ask a software engineer to design an operations function. It combines software engineering practices with operations expertise to create highly reliable, scalable systems. Unlike traditional operations teams that focus solely on stability, SRE teams balance reliability with feature velocity through automation and engineering solutions.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">The Error Budget Concept</h2>
      <p class="text-body mb-4">The error budget is perhaps SRE's most revolutionary concept. It quantifies the acceptable level of unreliability for a service. Here's how it works:</p>
      <p class="text-body mb-4">If your service has a 99.9% availability target (three nines), that means you can have 0.1% downtime. For a month with 730 hours, that's 43.8 minutes of acceptable downtime. This becomes your error budget.</p>
      <p class="text-body mb-4">When the error budget is exhausted, the team must focus on reliability improvements rather than new features. This creates a natural tension between development velocity and reliability, forcing teams to make data-driven decisions.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Service Level Objectives (SLOs)</h2>
      <p class="text-body mb-4">SLOs are specific, measurable goals for service reliability. They should be:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>User-Focused:</strong> Measure what users actually experience (e.g., request latency, error rate)</li>
        <li><strong>Achievable:</strong> Set based on historical data, not aspirational targets</li>
        <li><strong>Measurable:</strong> Defined with clear metrics and measurement windows</li>
        <li><strong>Documented:</strong> Clearly communicated to stakeholders</li>
      </ul>
      <p class="text-body mb-4">Example SLO: "99.9% of HTTP requests should complete within 200ms, measured over a 30-day rolling window."</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Service Level Indicators (SLIs)</h2>
      <p class="text-body mb-4">SLIs are the metrics you use to measure service reliability. Common SLIs include:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Availability:</strong> Percentage of successful requests</li>
        <li><strong>Latency:</strong> Time to process requests (p50, p95, p99)</li>
        <li><strong>Throughput:</strong> Requests per second the service can handle</li>
        <li><strong>Error Rate:</strong> Percentage of requests that result in errors</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Toil Reduction</h2>
      <p class="text-body mb-4">Toil is manual, repetitive work that scales linearly with system growth. SREs should spend no more than 50% of their time on toil. The rest should go toward engineering solutions. Common toil includes:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Manual deployments</li>
        <li>Repeated troubleshooting of the same issues</li>
        <li>Manual scaling decisions</li>
        <li>Data entry and reporting</li>
      </ul>
      <p class="text-body mb-4">Automation is the primary tool for toil reduction. Every manual process should be evaluated for automation potential.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Implementing SRE Practices</h2>
      <p class="text-body mb-4"><strong>1. Start with Monitoring and Observability</strong></p>
      <p class="text-body mb-4">You can't improve what you can't measure. Implement comprehensive monitoring with:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Metrics collection (Prometheus, CloudWatch)</li>
        <li>Distributed tracing (Jaeger, Zipkin)</li>
        <li>Centralized logging (ELK stack, Loki)</li>
        <li>Alerting based on SLO violations</li>
      </ul>
      
      <p class="text-body mb-4"><strong>2. Establish Error Budgets</strong></p>
      <p class="text-body mb-4">Work with product teams to define acceptable reliability levels. Use historical data to set realistic targets. Track error budget consumption in real-time dashboards.</p>
      
      <p class="text-body mb-4"><strong>3. Automate Everything</strong></p>
      <p class="text-body mb-4">Automate deployments, scaling, failover, and recovery procedures. Use Infrastructure as Code for all infrastructure changes. Implement automated testing at every level.</p>
      
      <p class="text-body mb-4"><strong>4. Practice Chaos Engineering</strong></p>
      <p class="text-body mb-4">Proactively test system resilience by injecting failures. Tools like Chaos Monkey or AWS Fault Injection Simulator help identify weaknesses before they cause real incidents.</p>
      
      <p class="text-body mb-4"><strong>5. Postmortem Culture</strong></p>
      <p class="text-body mb-4">After every incident, conduct a blameless postmortem. Focus on process improvements, not individual blame. Document learnings and implement preventive measures.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Common SRE Anti-Patterns</h2>
      <p class="text-body mb-4">Avoid these common mistakes when implementing SRE:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Setting Unrealistic SLOs:</strong> Targets that are too aggressive lead to constant violations and team burnout</li>
        <li><strong>Alert Fatigue:</strong> Too many alerts desensitize on-call engineers. Only alert on actionable issues</li>
        <li><strong>Ignoring Error Budgets:</strong> If error budgets don't influence product decisions, they're meaningless</li>
        <li><strong>Manual Operations:</strong> Failing to automate toil defeats the purpose of SRE</li>
        <li><strong>Blame Culture:</strong> Postmortems should focus on systems and processes, not individuals</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Measuring SRE Success</h2>
      <p class="text-body mb-4">Key metrics for SRE teams include:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Error Budget Consumption:</strong> How much of the budget is used over time</li>
        <li><strong>Time to Detection (TTD):</strong> How quickly incidents are identified</li>
        <li><strong>Time to Resolution (TTR):</strong> How quickly incidents are resolved</li>
        <li><strong>Toil Percentage:</strong> Time spent on manual, repetitive work</li>
        <li><strong>Change Failure Rate:</strong> Percentage of deployments causing incidents</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Conclusion</h2>
      <p class="text-body mb-4">SRE is not just a job title—it's a mindset and a set of practices that balance reliability with innovation. By implementing error budgets, focusing on automation, and maintaining a culture of continuous improvement, organizations can build systems that are both reliable and capable of rapid iteration.</p>
      <p class="text-body mb-4">Remember: perfect reliability is not the goal. The goal is to make informed trade-offs between reliability and feature velocity, using data and engineering practices to optimize both.</p>
    `,
    date: '2025-01-15',
    readTime: '15 min read',
    category: 'SRE',
    author: 'Suhas Reddy'
  },
  {
    id: '3',
    title: 'Optimizing CI/CD Pipelines: Reducing Build Times by 70%',
    excerpt: 'Practical strategies for accelerating your CI/CD pipelines through parallelization, caching, and intelligent dependency management.',
    content: `
      <p class="text-body mb-4">Slow CI/CD pipelines are productivity killers. Every minute developers wait for builds is a minute they're not shipping features. In this post, I'll share practical strategies that helped reduce our pipeline execution time from 45 minutes to under 14 minutes—a 70% improvement.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Understanding Pipeline Bottlenecks</h2>
      <p class="text-body mb-4">Before optimizing, you need to understand where time is spent. Common bottlenecks include:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Dependency Installation:</strong> Downloading and installing npm, pip, or Maven dependencies</li>
        <li><strong>Docker Image Builds:</strong> Rebuilding images from scratch on every run</li>
        <li><strong>Sequential Test Execution:</strong> Running tests one after another</li>
        <li><strong>Inefficient Caching:</strong> Not leveraging build caches effectively</li>
        <li><strong>Resource Constraints:</strong> Under-provisioned build agents</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Strategy 1: Intelligent Dependency Caching</h2>
      <p class="text-body mb-4">Dependency installation often consumes 30-40% of pipeline time. Here's how to optimize it:</p>
      <p class="text-body mb-4"><strong>For Node.js Projects:</strong></p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code># Cache node_modules
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: $&#123;&#123; runner.os &#125;&#125;-node-$&#123;&#123; hashFiles('**/package-lock.json') &#125;&#125;
    restore-keys: |
      $&#123;&#123; runner.os &#125;&#125;-node-

# Install dependencies (only downloads if cache miss)
- run: npm ci</code></pre>
      <p class="text-body mb-4"><strong>For Python Projects:</strong></p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code># Cache pip packages
- name: Cache pip packages
  uses: actions/cache@v3
  with:
    path: ~/.cache/pip
    key: $&#123;&#123; runner.os &#125;&#125;-pip-$&#123;&#123; hashFiles('**/requirements.txt') &#125;&#125;

- run: pip install -r requirements.txt</code></pre>
      <p class="text-body mb-4">This approach reduced our dependency installation time from 8 minutes to 30 seconds on cache hits.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Strategy 2: Docker Layer Caching</h2>
      <p class="text-body mb-4">Docker builds can be dramatically accelerated with proper layer caching. Key principles:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Order Dockerfile Instructions:</strong> Place frequently changing files last</li>
        <li><strong>Use Multi-Stage Builds:</strong> Separate build and runtime dependencies</li>
        <li><strong>Leverage BuildKit:</strong> Enable BuildKit for advanced caching features</li>
      </ul>
      <p class="text-body mb-4">Example optimized Dockerfile:</p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code># Stage 1: Dependencies (cached unless package.json changes)
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build (cached unless source changes)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: Runtime (minimal image)
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]</code></pre>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Strategy 3: Parallel Test Execution</h2>
      <p class="text-body mb-4">Running tests sequentially wastes time. Parallelize test execution:</p>
      <p class="text-body mb-4"><strong>Jest (Node.js):</strong></p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code># Run tests in parallel with max workers
npm test -- --maxWorkers=4

# Or split by test files
npm test -- --testPathPattern=unit
npm test -- --testPathPattern=integration</code></pre>
      <p class="text-body mb-4"><strong>Pytest (Python):</strong></p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code># Install pytest-xdist for parallel execution
pip install pytest-xdist

# Run tests in parallel
pytest -n auto  # auto-detects CPU count</code></pre>
      <p class="text-body mb-4">We split our test suite into unit, integration, and e2e tests, running them in parallel. This reduced test execution from 20 minutes to 6 minutes.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Strategy 4: Conditional Pipeline Execution</h2>
      <p class="text-body mb-4">Not every commit needs to run the full pipeline. Use path-based triggers:</p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code># Only run tests if relevant files changed
on:
  push:
    paths:
      - 'src/**'
      - 'tests/**'
      - 'package.json'

jobs:
  test:
    if: contains(github.event.head_commit.message, '[skip tests]') == false
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test</code></pre>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Strategy 5: Optimize Build Agents</h2>
      <p class="text-body mb-4">The right build agent configuration makes a huge difference:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Use Larger Instances:</strong> More CPU and memory can significantly speed up builds</li>
        <li><strong>SSD Storage:</strong> Faster I/O for dependency installation and Docker builds</li>
        <li><strong>Dedicated Runners:</strong> For critical pipelines, use dedicated runners to avoid queue times</li>
        <li><strong>Matrix Builds:</strong> Test multiple configurations in parallel</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Strategy 6: Incremental Builds</h2>
      <p class="text-body mb-4">Only rebuild what changed. For monorepos, use tools like:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Nx:</strong> Intelligent caching and task scheduling for monorepos</li>
        <li><strong>Turborepo:</strong> High-performance build system for JavaScript/TypeScript</li>
        <li><strong>Bazel:</strong> Google's build system with advanced caching</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Strategy 7: Artifact Management</h2>
      <p class="text-body mb-4">Store and reuse build artifacts:</p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code># Upload build artifacts
- name: Upload artifacts
  uses: actions/upload-artifact@v3
  with:
    name: build-artifacts
    path: dist/

# Download in deployment job
- name: Download artifacts
  uses: actions/download-artifact@v3
  with:
    name: build-artifacts</code></pre>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Measuring Improvements</h2>
      <p class="text-body mb-4">Track these metrics to measure optimization success:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Average Pipeline Duration:</strong> Track over time</li>
        <li><strong>Cache Hit Rate:</strong> Percentage of builds using cached dependencies</li>
        <li><strong>Queue Time:</strong> Time builds spend waiting for agents</li>
        <li><strong>Cost per Build:</strong> Compute costs for pipeline execution</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Real-World Results</h2>
      <p class="text-body mb-4">After implementing these strategies, we achieved:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Pipeline time: 45 minutes → 14 minutes (70% reduction)</li>
        <li>Dependency installation: 8 minutes → 30 seconds (94% reduction)</li>
        <li>Test execution: 20 minutes → 6 minutes (70% reduction)</li>
        <li>Docker build time: 12 minutes → 4 minutes (67% reduction)</li>
        <li>Developer satisfaction: Significantly improved</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Conclusion</h2>
      <p class="text-body mb-4">CI/CD optimization is an ongoing process. Start by measuring current performance, identify bottlenecks, and implement optimizations incrementally. The strategies outlined here—caching, parallelization, and intelligent execution—can dramatically improve pipeline performance.</p>
      <p class="text-body mb-4">Remember: fast feedback loops are essential for developer productivity. Every minute saved in CI/CD translates to faster feature delivery and happier developers.</p>
    `,
    date: '2025-01-10',
    readTime: '10 min read',
    category: 'DevOps',
    author: 'Suhas Reddy'
  },
  {
    id: '4',
    title: 'Kubernetes Monitoring and Observability: A Complete Guide',
    excerpt: 'Implementing comprehensive monitoring, logging, and tracing for Kubernetes clusters to ensure visibility and quick incident response.',
    content: `
      <p class="text-body mb-4">Kubernetes clusters are complex distributed systems. Without proper observability, you're flying blind. This guide covers the essential tools and practices for monitoring, logging, and tracing in Kubernetes environments.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">The Three Pillars of Observability</h2>
      <p class="text-body mb-4">Observability in Kubernetes rests on three pillars:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Metrics:</strong> Numerical data points collected over time (CPU, memory, request rate)</li>
        <li><strong>Logs:</strong> Timestamped records of events and errors</li>
        <li><strong>Traces:</strong> End-to-end request journeys across services</li>
      </ul>
      <p class="text-body mb-4">Each pillar provides different insights, and you need all three for comprehensive observability.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Metrics Collection with Prometheus</h2>
      <p class="text-body mb-4">Prometheus is the de facto standard for Kubernetes metrics. It's a time-series database designed for monitoring.</p>
      <p class="text-body mb-4"><strong>Key Components:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Prometheus Server:</strong> Scrapes and stores metrics</li>
        <li><strong>Exporters:</strong> Expose metrics from various systems (node-exporter, kube-state-metrics)</li>
        <li><strong>Alertmanager:</strong> Handles alert routing and notification</li>
      </ul>
      <p class="text-body mb-4"><strong>Deploying Prometheus:</strong></p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
      - job_name: 'kubernetes-pods'
        kubernetes_sd_configs:
          - role: pod
      - job_name: 'kubernetes-nodes'
        kubernetes_sd_configs:
          - role: node</code></pre>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Key Metrics to Monitor</h2>
      <p class="text-body mb-4"><strong>Cluster-Level Metrics:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Node CPU and memory utilization</li>
        <li>Pod scheduling failures</li>
        <li>API server latency</li>
        <li>etcd performance</li>
      </ul>
      <p class="text-body mb-4"><strong>Application-Level Metrics:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Request rate and latency (p50, p95, p99)</li>
        <li>Error rates by status code</li>
        <li>Business metrics (orders, transactions)</li>
        <li>Resource consumption per service</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Visualization with Grafana</h2>
      <p class="text-body mb-4">Grafana provides powerful visualization for Prometheus metrics. Essential dashboards include:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Cluster Overview:</strong> Node health, resource usage, pod distribution</li>
        <li><strong>Application Performance:</strong> Request rates, latency, error rates</li>
        <li><strong>Resource Utilization:</strong> CPU, memory, network, storage per namespace</li>
        <li><strong>Cost Analysis:</strong> Resource costs by team/service</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Centralized Logging</h2>
      <p class="text-body mb-4">Kubernetes pods generate logs that need aggregation. The ELK stack (Elasticsearch, Logstash, Kibana) is a popular solution:</p>
      <p class="text-body mb-4"><strong>Fluentd for Log Collection:</strong></p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-config
data:
  fluent.conf: |
    <source>
      @type tail
      path /var/log/containers/*.log
      pos_file /var/log/fluentd-containers.log.pos
      tag kubernetes.*
      read_from_head true
      <parse>
        @type json
      </parse>
    </source>
    <match kubernetes.**>
      @type elasticsearch
      host elasticsearch.logging.svc.cluster.local
      port 9200
      logstash_format true
    </match></code></pre>
      <p class="text-body mb-4"><strong>Alternative: Loki</strong></p>
      <p class="text-body mb-4">Loki is a lightweight alternative to ELK, designed specifically for Kubernetes. It's more cost-effective and easier to operate.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Distributed Tracing</h2>
      <p class="text-body mb-4">In microservices architectures, requests span multiple services. Distributed tracing shows the complete request journey.</p>
      <p class="text-body mb-4"><strong>Jaeger for Tracing:</strong></p>
      <p class="text-body mb-4">Jaeger is an open-source distributed tracing system. It helps you:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Identify performance bottlenecks</li>
        <li>Understand service dependencies</li>
        <li>Debug distributed system issues</li>
      </ul>
      <p class="text-body mb-4"><strong>OpenTelemetry Integration:</strong></p>
      <p class="text-body mb-4">OpenTelemetry provides vendor-neutral instrumentation. Use it to instrument your applications:</p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>from opentelemetry import trace
from opentelemetry.exporter.jaeger import JaegerExporter
from opentelemetry.sdk.trace import TracerProvider

trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("process_request"):
    # Your application code
    process_request()</code></pre>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Alerting Best Practices</h2>
      <p class="text-body mb-4">Effective alerting prevents alert fatigue and ensures on-call engineers respond to real issues:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Alert on Symptoms, Not Causes:</strong> Alert when users are affected, not when a metric changes</li>
        <li><strong>Use SLO-Based Alerts:</strong> Alert when error budgets are at risk</li>
        <li><strong>Avoid Redundant Alerts:</strong> Consolidate related alerts</li>
        <li><strong>Set Appropriate Thresholds:</strong> Base thresholds on historical data</li>
        <li><strong>Document Runbooks:</strong> Every alert should have a runbook</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Cost Optimization</h2>
      <p class="text-body mb-4">Observability can be expensive. Optimize costs by:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Data Retention Policies:</strong> Keep detailed metrics for 30 days, aggregated for 1 year</li>
        <li><strong>Log Sampling:</strong> Sample verbose logs, keep all errors</li>
        <li><strong>Metric Cardinality:</strong> Limit high-cardinality labels</li>
        <li><strong>Use Managed Services:</strong> Consider managed Prometheus (AWS, GCP) for scale</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Conclusion</h2>
      <p class="text-body mb-4">Comprehensive observability is essential for running Kubernetes in production. By implementing metrics collection with Prometheus, centralized logging, and distributed tracing, you gain the visibility needed to maintain reliable systems.</p>
      <p class="text-body mb-4">Remember: observability is not a one-time setup. Continuously refine your dashboards, alerts, and instrumentation based on real incidents and evolving requirements.</p>
    `,
    date: '2025-01-05',
    readTime: '14 min read',
    category: 'Kubernetes',
    author: 'Suhas Reddy'
  },
  {
    id: '5',
    title: 'AWS EKS vs GKE vs AKS: Choosing the Right Managed Kubernetes Service',
    excerpt: 'A detailed comparison of managed Kubernetes offerings from major cloud providers, including cost, features, and use case recommendations.',
    content: `
      <p class="text-body mb-4">Choosing the right managed Kubernetes service is a critical decision that impacts your infrastructure costs, operational complexity, and team productivity. This comprehensive comparison of AWS EKS, Google GKE, and Azure AKS will help you make an informed choice.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Overview of Managed Kubernetes Services</h2>
      <p class="text-body mb-4">All three services provide managed Kubernetes control planes, but they differ significantly in features, pricing, and operational models. Let's examine each:</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">AWS Elastic Kubernetes Service (EKS)</h2>
      <p class="text-body mb-4"><strong>Strengths:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Deep integration with AWS services (IAM, VPC, CloudWatch, ALB)</li>
        <li>Fargate support for serverless containers</li>
        <li>Strong enterprise features and compliance certifications</li>
        <li>Extensive third-party tooling and community support</li>
        <li>Multi-region and multi-cloud deployment options</li>
      </ul>
      <p class="text-body mb-4"><strong>Weaknesses:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Higher control plane cost ($0.10/hour = ~$73/month)</li>
        <li>More complex initial setup compared to GKE</li>
        <li>Slower Kubernetes version updates</li>
        <li>Requires more operational knowledge</li>
      </ul>
      <p class="text-body mb-4"><strong>Pricing:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Control plane: $0.10/hour per cluster</li>
        <li>Worker nodes: Standard EC2 pricing</li>
        <li>Data transfer: Standard AWS data transfer costs</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Google Kubernetes Engine (GKE)</h2>
      <p class="text-body mb-4"><strong>Strengths:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Kubernetes originator - most mature managed service</li>
        <li>Fastest Kubernetes version updates</li>
        <li>Autopilot mode for fully managed operations</li>
        <li>Integrated with Google Cloud services</li>
        <li>Excellent developer experience and documentation</li>
        <li>Free tier covers up to $74.40/month for one standard zonal cluster</li>
      </ul>
      <p class="text-body mb-4"><strong>Weaknesses:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Less enterprise adoption compared to AWS</li>
        <li>Smaller third-party ecosystem</li>
        <li>Regional availability limitations in some areas</li>
        <li>Autopilot mode has some limitations</li>
      </ul>
      <p class="text-body mb-4"><strong>Pricing:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Free tier: Up to $74.40/month credit for one standard zonal cluster (covers $0.10/hour cluster management fee)</li>
        <li>Additional clusters or regional clusters incur charges beyond the free tier</li>
        <li>Autopilot: Pay only for resources used</li>
        <li>Worker nodes: Standard GCP compute pricing</li>
        <li>Note: You still pay for compute, storage, and networking resources</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Azure Kubernetes Service (AKS)</h2>
      <p class="text-body mb-4"><strong>Strengths:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Free control plane (no per-cluster charge)</li>
        <li>Strong integration with Microsoft ecosystem</li>
        <li>Good for hybrid cloud scenarios</li>
        <li>Windows container support</li>
        <li>Azure Arc for multi-cloud management</li>
        <li>Competitive pricing for enterprise agreements</li>
      </ul>
      <p class="text-body mb-4"><strong>Weaknesses:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Less mature than GKE</li>
        <li>Smaller community and ecosystem</li>
        <li>Some advanced features lag behind competitors</li>
        <li>Regional availability varies</li>
      </ul>
      <p class="text-body mb-4"><strong>Pricing:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Control plane: Free</li>
        <li>Worker nodes: Standard Azure VM pricing</li>
        <li>Additional features may have separate charges</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Feature Comparison</h2>
      <table class="w-full border-collapse border border-ink-light-gray mb-4">
        <thead>
          <tr class="bg-ink-black/5">
            <th class="border border-ink-light-gray p-2 text-left font-serif">Feature</th>
            <th class="border border-ink-light-gray p-2 text-center font-serif">EKS</th>
            <th class="border border-ink-light-gray p-2 text-center font-serif">GKE</th>
            <th class="border border-ink-light-gray p-2 text-center font-serif">AKS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-ink-light-gray p-2 font-serif">Control Plane Cost</td>
            <td class="border border-ink-light-gray p-2 text-center font-serif">$73/month</td>
            <td class="border border-ink-light-gray p-2 text-center font-serif">Free tier: $74.40/month credit for 1 cluster</td>
            <td class="border border-ink-light-gray p-2 text-center font-serif">Free</td>
          </tr>
          <tr class="bg-ink-black/5">
            <td class="border border-ink-light-gray p-2 font-serif">K8s Version Updates</td>
            <td class="border border-ink-light-gray p-2 text-center font-serif">Slower</td>
            <td class="border border-ink-light-gray p-2 text-center font-serif">Fastest</td>
            <td class="border border-ink-light-gray p-2 text-center font-serif">Moderate</td>
          </tr>
          <tr>
            <td class="border border-ink-light-gray p-2 font-serif">Serverless Option</td>
            <td class="border border-ink-light-gray p-2 text-center font-serif">Fargate</td>
            <td class="border border-ink-light-gray p-2 text-center font-serif">Autopilot</td>
            <td class="border border-ink-light-gray p-2 text-center font-serif">Limited</td>
          </tr>
          <tr class="bg-ink-black/5">
            <td class="border border-ink-light-gray p-2 font-serif">Windows Containers</td>
            <td class="border border-ink-light-gray p-2 text-center font-serif">Yes</td>
            <td class="border border-ink-light-gray p-2 text-center font-serif">Limited</td>
            <td class="border border-ink-light-gray p-2 text-center font-serif">Yes</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Use Case Recommendations</h2>
      <p class="text-body mb-4"><strong>Choose AWS EKS if:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>You're already heavily invested in AWS ecosystem</li>
        <li>You need deep AWS service integration (RDS, S3, Lambda)</li>
        <li>Enterprise compliance requirements are critical</li>
        <li>You need Fargate for serverless workloads</li>
        <li>Multi-cloud strategy with AWS as primary</li>
      </ul>
      <p class="text-body mb-4"><strong>Choose GKE if:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>You want the most Kubernetes-native experience</li>
        <li>Fast Kubernetes version adoption is important</li>
        <li>You prefer minimal operational overhead (Autopilot)</li>
        <li>Cost optimization is a priority (free tier available)</li>
        <li>You're building cloud-native applications from scratch</li>
      </ul>
      <p class="text-body mb-4"><strong>Choose AKS if:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>You're in a Microsoft-centric organization</li>
        <li>Hybrid cloud with Azure is required</li>
        <li>Windows container workloads are significant</li>
        <li>You have existing Azure investments</li>
        <li>Cost is a primary concern (free control plane)</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Cost Analysis Example</h2>
      <p class="text-body mb-4">For a production cluster with 3 worker nodes (m5.large equivalent):</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>EKS:</strong> ~$73/month (control plane) + ~$150/month (nodes) = ~$223/month</li>
        <li><strong>GKE:</strong> $0 (covered by free tier for first cluster) + ~$150/month (nodes) = ~$150/month</li>
        <li><strong>AKS:</strong> $0 (control plane) + ~$150/month (nodes) = ~$150/month</li>
      </ul>
      <p class="text-body mb-4"><strong>Note:</strong> GKE's free tier provides up to $74.40/month credit, which covers the $0.10/hour cluster management fee for one standard zonal cluster. Additional clusters or regional clusters will incur charges beyond this free tier. Actual costs vary based on instance types, regions, and usage patterns.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Migration Considerations</h2>
      <p class="text-body mb-4">If you need to migrate between platforms:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Kubernetes APIs are largely portable</li>
        <li>Cloud-specific integrations will need rework</li>
        <li>Consider Velero for backup and restore</li>
        <li>Plan for service discovery and networking changes</li>
        <li>Test thoroughly in staging before production migration</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Conclusion</h2>
      <p class="text-body mb-4">There's no one-size-fits-all answer. The best choice depends on your existing infrastructure, team expertise, compliance requirements, and budget. AWS EKS offers the most comprehensive enterprise features, GKE provides the best Kubernetes experience, and AKS is the most cost-effective for Microsoft-centric organizations.</p>
      <p class="text-body mb-4">Evaluate your specific needs, run proof-of-concepts, and consider long-term strategic alignment with your cloud provider. Remember: the managed Kubernetes service is just one piece of your infrastructure puzzle—consider the entire ecosystem when making your decision.</p>
    `,
    date: '2024-12-28',
    readTime: '11 min read',
    category: 'Cloud',
    author: 'Suhas Reddy'
  },
  {
    id: '6',
    title: 'Infrastructure as Code: Terraform Modules and Best Practices',
    excerpt: 'Building reusable, maintainable Terraform modules and establishing patterns for managing complex infrastructure across multiple environments.',
    content: `
      <p class="text-body mb-4">As infrastructure grows in complexity, managing it with ad-hoc Terraform configurations becomes unsustainable. Terraform modules provide a way to package and reuse infrastructure components, making your IaC more maintainable, testable, and scalable. This guide covers module design patterns and best practices.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Why Use Terraform Modules?</h2>
      <p class="text-body mb-4">Modules offer several key benefits:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Reusability:</strong> Define infrastructure once, use it multiple times</li>
        <li><strong>Consistency:</strong> Ensure identical configurations across environments</li>
        <li><strong>Maintainability:</strong> Update infrastructure in one place, propagate changes everywhere</li>
        <li><strong>Abstraction:</strong> Hide complexity behind simple interfaces</li>
        <li><strong>Testing:</strong> Test modules independently before using in production</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Module Structure</h2>
      <p class="text-body mb-4">A well-structured module follows this pattern:</p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>modules/
  vpc/
    main.tf          # Primary resources
    variables.tf      # Input variables
    outputs.tf        # Output values
    versions.tf       # Provider version constraints
    README.md         # Documentation
    examples/         # Usage examples
      basic/
        main.tf</code></pre>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Creating a VPC Module</h2>
      <p class="text-body mb-4">Let's create a reusable VPC module:</p>
      <p class="text-body mb-4"><strong>variables.tf:</strong></p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>variable "name" {
  description = "Name prefix for resources"
  type        = string
}

variable "cidr_block" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
}

variable "enable_nat_gateway" {
  description = "Enable NAT Gateway for private subnets"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}</code></pre>
      <p class="text-body mb-4"><strong>main.tf:</strong></p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>resource "aws_vpc" "main" {
  cidr_block           = var&#46;cidr_block
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(
    var&#46;tags,
    {
      Name = var&#46;name
    }
  )
}

resource "aws_subnet" "public" {
  count             = length(var&#46;availability_zones)
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var&#46;cidr_block, 8, count.index)
  availability_zone = var&#46;availability_zones[count.index]

  tags = merge(
    var&#46;tags,
    {
      Name = "$&#123;var&#46;name&#125;-public-$&#123;count.index + 1&#125;"
    }
  )
}</code></pre>
      <p class="text-body mb-4"><strong>outputs.tf:</strong></p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs of public subnets"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "IDs of private subnets"
  value       = aws_subnet.private[*].id
}</code></pre>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Using Modules</h2>
      <p class="text-body mb-4">Call the module from your root configuration:</p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>module "vpc" {
  source = "./modules/vpc"

  name               = "production"
  cidr_block         = "10.0.0.0/16"
  availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"]
  enable_nat_gateway = true

  tags = {
    Environment = "production"
    ManagedBy   = "terraform"
  }
}

# Use module outputs
resource "aws_instance" "app" {
  subnet_id = module.vpc.public_subnet_ids[0]
  # ...
}</code></pre>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Module Best Practices</h2>
      <p class="text-body mb-4"><strong>1. Version Your Modules</strong></p>
      <p class="text-body mb-4">Use Git tags for module versions:</p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>module "vpc" {
  source = "git::https://github.com/org/terraform-modules.git//vpc?ref=v1.2.0"
}</code></pre>
      <p class="text-body mb-4"><strong>2. Use Semantic Versioning</strong></p>
      <p class="text-body mb-4">Follow semver: MAJOR.MINOR.PATCH. Breaking changes increment MAJOR.</p>
      
      <p class="text-body mb-4"><strong>3. Provide Sensible Defaults</strong></p>
      <p class="text-body mb-4">Default values make modules easier to use while still allowing customization:</p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.medium"
}</code></pre>
      
      <p class="text-body mb-4"><strong>4. Validate Inputs</strong></p>
      <p class="text-body mb-4">Use validation blocks to catch errors early:</p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>variable "instance_count" {
  description = "Number of instances"
  type        = number
  
  validation {
    condition     = var&#46;instance_count > 0 && var&#46;instance_count <= 10
    error_message = "Instance count must be between 1 and 10."
  }
}</code></pre>
      
      <p class="text-body mb-4"><strong>5. Document Everything</strong></p>
      <p class="text-body mb-4">Every module needs a README with:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Purpose and use cases</li>
        <li>Input variables with descriptions</li>
        <li>Output values</li>
        <li>Usage examples</li>
        <li>Requirements and dependencies</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Module Composition</h2>
      <p class="text-body mb-4">Modules can call other modules. This enables building complex infrastructure from simple building blocks:</p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>module "networking" {
  source = "./modules/vpc"
  # ...
}

module "compute" {
  source = "./modules/eks"
  
  vpc_id             = module.networking.vpc_id
  subnet_ids         = module.networking.private_subnet_ids
  # ...
}</code></pre>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Testing Modules</h2>
      <p class="text-body mb-4">Test modules before using in production:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>terraform validate:</strong> Check syntax and configuration</li>
        <li><strong>terraform fmt:</strong> Ensure consistent formatting</li>
        <li><strong>terraform plan:</strong> Verify the execution plan</li>
        <li><strong>Terratest:</strong> Write automated tests in Go</li>
        <li><strong>Examples:</strong> Test with real-world scenarios</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Common Patterns</h2>
      <p class="text-body mb-4"><strong>Conditional Resources:</strong></p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>resource "aws_nat_gateway" "main" {
  count = var&#46;enable_nat_gateway ? 1 : 0
  # ...
}</code></pre>
      <p class="text-body mb-4"><strong>Dynamic Blocks:</strong></p>
      <pre class="bg-ink-black/5 p-4 rounded mb-4 overflow-x-auto text-sm font-mono"><code>dynamic "tag" {
  for_each = var&#46;tags
  content {
    key   = tag.key
    value = tag.value
  }
}</code></pre>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Module Registry</h2>
      <p class="text-body mb-4">Publish modules to Terraform Registry for easy sharing:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li>Public modules: terraform-registry.com</li>
        <li>Private modules: Terraform Cloud/Enterprise</li>
        <li>Git-based modules: GitHub, GitLab, Bitbucket</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black mb-4 mt-8">Conclusion</h2>
      <p class="text-body mb-4">Terraform modules are essential for managing infrastructure at scale. By following these best practices—versioning, validation, documentation, and testing—you can build a library of reusable, reliable infrastructure components.</p>
      <p class="text-body mb-4">Start small with simple modules, iterate based on real usage, and gradually build a comprehensive module library. Well-designed modules are investments that pay dividends in reduced maintenance overhead and faster infrastructure delivery.</p>
    `,
    date: '2024-12-20',
    readTime: '13 min read',
    category: 'DevOps',
    author: 'Suhas Reddy'
  },
  {
    id: '7',
    title: 'Prompt Engineering Cheatsheet: A Comprehensive Guide',
    excerpt: 'Master the art of prompt engineering with essential patterns, advanced techniques, and best practices for getting the most out of AI models.',
    content: `
      <p class="text-body mb-4">Prompt engineering is the art and science of crafting inputs that guide AI models to produce desired outputs. As AI becomes increasingly integrated into our workflows, understanding how to effectively communicate with these models becomes a critical skill. This comprehensive guide covers essential patterns, advanced techniques, and best practices for prompt engineering.</p>
      
      <div class="bg-ink-black/5 dark:bg-ink-black/20 p-4 rounded mb-6 border-l-4 border-black dark:border-foreground">
        <h3 class="text-xl font-serif font-semibold text-black dark:text-foreground mb-2">Quick Reference: Temperature Settings</h3>
        <p class="text-body mb-2"><strong>Low (0.1-0.3):</strong> Precision and consistency - Use for code generation, factual Q&A, translation</p>
        <p class="text-body mb-2"><strong>Medium (0.4-0.6):</strong> Balanced accuracy and creativity - Use for general tasks, content creation</p>
        <p class="text-body"><strong>High (0.7-1.0):</strong> Maximum creativity - Use for brainstorming, creative writing, ideation</p>
      </div>
      
      <h2 class="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4 mt-8">Core Principles</h2>
      <p class="text-body mb-4">Effective prompt engineering rests on four fundamental principles:</p>
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>Be Specific:</strong> Vague prompts lead to vague outputs. Clearly define what you want.</li>
        <li><strong>Provide Context:</strong> Give the AI the background information it needs to understand your request.</li>
        <li><strong>Use Examples:</strong> Show the AI what good output looks like with few-shot examples.</li>
        <li><strong>Set Constraints:</strong> Define boundaries, format requirements, and limitations explicitly.</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4 mt-8">Essential Prompt Patterns</h2>
      <p class="text-body mb-4">These proven patterns form the foundation of effective prompt engineering:</p>
      
      <div class="bg-ink-black/5 dark:bg-ink-black/20 p-4 rounded mb-4">
        <h3 class="text-lg font-serif font-semibold text-black dark:text-foreground mb-2">1. Persona Pattern</h3>
        <p class="text-body mb-2"><strong>Purpose:</strong> Assume a role to shape tone & knowledge</p>
        <p class="text-body mb-2"><strong>Template:</strong> "Act as a {role}. {task}. Consider {constraints}."</p>
        <p class="text-body italic">Example: "Act as a physics teacher. Explain terminal velocity with an analogy."</p>
      </div>
      
      <div class="bg-ink-black/5 dark:bg-ink-black/20 p-4 rounded mb-4">
        <h3 class="text-lg font-serif font-semibold text-black dark:text-foreground mb-2">2. Audience Persona Pattern</h3>
        <p class="text-body mb-2"><strong>Purpose:</strong> Specify target audience for complexity tuning</p>
        <p class="text-body mb-2"><strong>Template:</strong> "Write for {audience}. {task}. Keep reading level around {grade} and include {style cues}."</p>
        <p class="text-body italic">Example: "Write for MBA students: compare A/B testing vs. causal inference, 8th-grade reading level."</p>
      </div>
      
      <div class="bg-ink-black/5 dark:bg-ink-black/20 p-4 rounded mb-4">
        <h3 class="text-lg font-serif font-semibold text-black dark:text-foreground mb-2">3. Flipped Interaction Pattern</h3>
        <p class="text-body mb-2"><strong>Purpose:</strong> Model interviews you before answering</p>
        <p class="text-body mb-2"><strong>Template:</strong> "You are a consultant. Ask up to 5 clarifying questions. After I answer, propose a solution."</p>
        <p class="text-body italic">Example: "You're a product strategist. Ask 4 questions about our app. Then recommend a launch plan."</p>
      </div>
      
      <div class="bg-ink-black/5 dark:bg-ink-black/20 p-4 rounded mb-4">
        <h3 class="text-lg font-serif font-semibold text-black dark:text-foreground mb-2">4. Template Pattern</h3>
        <p class="text-body mb-2"><strong>Purpose:</strong> Provide structured form to fill</p>
        <p class="text-body mb-2"><strong>Template:</strong> "Use this template: {fields}. Populate it for {task}."</p>
        <p class="text-body italic">Example: "Use template—Problem, Evidence, Options, Recommendation—for a memo on cart abandonment."</p>
      </div>
      
      <div class="bg-ink-black/5 dark:bg-ink-black/20 p-4 rounded mb-4">
        <h3 class="text-lg font-serif font-semibold text-black dark:text-foreground mb-2">5. Recipe Pattern</h3>
        <p class="text-body mb-2"><strong>Purpose:</strong> Stepwise procedure with ingredients & tools</p>
        <p class="text-body mb-2"><strong>Template:</strong> "Create a recipe for {goal} including: Inputs, Tools, Steps (numbered), Quality checks, Variations."</p>
        <p class="text-body italic">Example: "Recipe for blog post: inputs (audience, thesis), steps (outline→draft→revise), QC checklist."</p>
      </div>
      
      <div class="bg-ink-black/5 dark:bg-ink-black/20 p-4 rounded mb-4">
        <h3 class="text-lg font-serif font-semibold text-black dark:text-foreground mb-2">6. Alternative Approaches Pattern</h3>
        <p class="text-body mb-2"><strong>Purpose:</strong> Generate multiple methods with trade-offs</p>
        <p class="text-body mb-2"><strong>Template:</strong> "Provide 3 approaches to {problem}. For each: steps, pros, cons, effort, risk. End with a comparison table."</p>
        <p class="text-body italic">Example: "Three ways to implement search (keyword, semantic, hybrid) with pros/cons."</p>
      </div>
      
      <div class="bg-ink-black/5 dark:bg-ink-black/20 p-4 rounded mb-4">
        <h3 class="text-lg font-serif font-semibold text-black dark:text-foreground mb-2">7. Bridge Pattern</h3>
        <p class="text-body mb-2"><strong>Purpose:</strong> Combine goal → constraints → examples → evaluation</p>
        <p class="text-body mb-2"><strong>Template:</strong> "Goal: {goal}. Constraints: {list}. Examples: {few-shot}. Evaluation: {rubric}. Task: {do X}. Output format: {schema}."</p>
        <p class="text-body italic">Example: "Goal: draft policy brief. Constraints: ≤400 words, neutral tone, cite 2 sources. Evaluation: clarity, evidence."</p>
      </div>
      
      <h2 class="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4 mt-8">Advanced Techniques</h2>
      <p class="text-body mb-4">Beyond basic patterns, these advanced techniques unlock more sophisticated AI interactions:</p>
      
      <table class="w-full border-collapse border border-ink-light-gray dark:border-border mb-4">
        <thead>
          <tr class="bg-ink-black/5 dark:bg-ink-black/20">
            <th class="border border-ink-light-gray dark:border-border p-3 text-left font-serif">Technique</th>
            <th class="border border-ink-light-gray dark:border-border p-3 text-left font-serif">Description</th>
            <th class="border border-ink-light-gray dark:border-border p-3 text-left font-serif">When to Use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-ink-light-gray dark:border-border p-3 font-serif"><strong>Chain of Thought</strong></td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Ask AI to show step-by-step reasoning</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Complex problems, math, logic</td>
          </tr>
          <tr class="bg-ink-black/5 dark:bg-ink-black/20">
            <td class="border border-ink-light-gray dark:border-border p-3 font-serif"><strong>Few-Shot Learning</strong></td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Provide examples before asking for output</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Consistent format needed</td>
          </tr>
          <tr>
            <td class="border border-ink-light-gray dark:border-border p-3 font-serif"><strong>Zero-Shot</strong></td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">No examples, just instructions</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Simple tasks, general queries</td>
          </tr>
          <tr class="bg-ink-black/5 dark:bg-ink-black/20">
            <td class="border border-ink-light-gray dark:border-border p-3 font-serif"><strong>ReAct Prompting</strong></td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Combine reasoning + action methodically</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Problem-solving, analysis</td>
          </tr>
          <tr>
            <td class="border border-ink-light-gray dark:border-border p-3 font-serif"><strong>Self-Consistency</strong></td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Generate multiple answers, pick most common</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">High-stakes decisions, accuracy critical</td>
          </tr>
          <tr class="bg-ink-black/5 dark:bg-ink-black/20">
            <td class="border border-ink-light-gray dark:border-border p-3 font-serif"><strong>Prompt Chaining</strong></td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Use output of one prompt as input to next</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Multi-stage tasks, complex workflows</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4 mt-8">Output Formatting Techniques</h2>
      <p class="text-body mb-4">Control how the AI structures its responses:</p>
      
      <ul class="list-disc list-inside mb-4 space-y-2 text-body ml-4">
        <li><strong>JSON/XML:</strong> "Output as JSON with keys: {list}" or "Use XML structure"</li>
        <li><strong>Markdown:</strong> "Format as markdown with headers, lists, code blocks"</li>
        <li><strong>Structured Lists:</strong> "Provide numbered list" or "Use bullet points with sub-items"</li>
        <li><strong>Tables:</strong> "Format as table with columns: {cols}" or "Create comparison table"</li>
        <li><strong>Code Blocks:</strong> "Wrap code in ```language``` blocks" or "Use syntax highlighting"</li>
      </ul>
      
      <h2 class="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4 mt-8">System vs User Prompts</h2>
      <p class="text-body mb-4">Understanding when to use system vs user prompts is crucial:</p>
      
      <table class="w-full border-collapse border border-ink-light-gray dark:border-border mb-4">
        <thead>
          <tr class="bg-ink-black/5 dark:bg-ink-black/20">
            <th class="border border-ink-light-gray dark:border-border p-3 text-left font-serif">Type</th>
            <th class="border border-ink-light-gray dark:border-border p-3 text-left font-serif">Purpose</th>
            <th class="border border-ink-light-gray dark:border-border p-3 text-left font-serif">Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-ink-light-gray dark:border-border p-3 font-serif"><strong>System Prompt</strong></td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Set behavior, role, constraints (persistent)</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Defining assistant personality, rules, context</td>
          </tr>
          <tr class="bg-ink-black/5 dark:bg-ink-black/20">
            <td class="border border-ink-light-gray dark:border-border p-3 font-serif"><strong>User Prompt</strong></td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Specific task, question, request</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Individual queries, one-off tasks</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4 mt-8">Common Mistakes & Optimization</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-800">
          <h3 class="text-lg font-serif font-semibold text-red-900 dark:text-red-300 mb-2">Avoid:</h3>
          <ul class="list-disc list-inside space-y-1 text-body ml-4">
            <li>Vague instructions</li>
            <li>Too many constraints</li>
            <li>Ignoring context</li>
            <li>No examples</li>
            <li>Single attempt</li>
          </ul>
        </div>
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded border border-blue-200 dark:border-blue-800">
          <h3 class="text-lg font-serif font-semibold text-blue-900 dark:text-blue-300 mb-2">Optimize:</h3>
          <ul class="list-disc list-inside space-y-1 text-body ml-4">
            <li>Remove redundant words</li>
            <li>Put important info first</li>
            <li>Use abbreviations</li>
            <li>Break into sub-prompts</li>
            <li>Remove unnecessary examples</li>
          </ul>
        </div>
      </div>
      
      <h2 class="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4 mt-8">Temperature Guidelines by Task</h2>
      <table class="w-full border-collapse border border-ink-light-gray dark:border-border mb-4">
        <thead>
          <tr class="bg-ink-black/5 dark:bg-ink-black/20">
            <th class="border border-ink-light-gray dark:border-border p-3 text-left font-serif">Task Type</th>
            <th class="border border-ink-light-gray dark:border-border p-3 text-left font-serif">Recommended Temp</th>
            <th class="border border-ink-light-gray dark:border-border p-3 text-left font-serif">Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Code generation</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">0.1-0.3</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Precision required</td>
          </tr>
          <tr class="bg-ink-black/5 dark:bg-ink-black/20">
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Factual Q&A</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">0.1-0.3</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Accuracy critical</td>
          </tr>
          <tr>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Translation</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">0.2-0.4</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Consistency needed</td>
          </tr>
          <tr class="bg-ink-black/5 dark:bg-ink-black/20">
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Creative writing</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">0.7-0.9</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Variety desired</td>
          </tr>
          <tr>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Brainstorming</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">0.8-1.0</td>
            <td class="border border-ink-light-gray dark:border-border p-3 text-body">Maximum creativity</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4 mt-8">Prompt Structure Template</h2>
      <div class="bg-ink-black/5 dark:bg-ink-black/20 p-4 rounded mb-6 border-l-4 border-black dark:border-foreground">
        <p class="text-body mb-2"><strong>[Instruction]</strong> What do you want the AI to do?</p>
        <p class="text-body mb-2"><strong>[Context]</strong> Background information the AI needs</p>
        <p class="text-body mb-2"><strong>[Examples]</strong> Show what good output looks like</p>
        <p class="text-body"><strong>[Constraints]</strong> Limitations or specific requirements</p>
      </div>
      
      <h2 class="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4 mt-8">Best Practices Summary</h2>
      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded mb-6 border border-green-200 dark:border-green-800">
        <ul class="list-disc list-inside space-y-2 text-body ml-4">
          <li><strong>Start simple, iterate:</strong> Begin with basic prompts and refine based on results</li>
          <li><strong>Be explicit:</strong> Don't assume the AI knows what you mean</li>
          <li><strong>Provide context/examples:</strong> Help the AI understand your intent</li>
          <li><strong>Test edge cases:</strong> Verify your prompts work in various scenarios</li>
          <li><strong>Use appropriate temperature:</strong> Match temperature to task requirements</li>
          <li><strong>Optimize tokens:</strong> Remove redundancy while maintaining clarity</li>
          <li><strong>Document successful prompts:</strong> Build a library of effective prompts</li>
        </ul>
      </div>
      
      <h2 class="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4 mt-8">Conclusion</h2>
      <p class="text-body mb-4">Prompt engineering is both an art and a science. By understanding core principles, mastering essential patterns, and applying advanced techniques, you can dramatically improve your interactions with AI models. Remember that effective prompting is an iterative process—start simple, test, refine, and optimize.</p>
      <p class="text-body mb-4">As AI continues to evolve, so too will the techniques for interacting with it. Stay curious, experiment with different approaches, and document what works. The investment in learning prompt engineering pays dividends in productivity, creativity, and the quality of AI-generated outputs.</p>
      
      <div class="mt-12 pt-8 border-t-2 border-ink-light-gray dark:border-border">
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 class="text-2xl font-serif font-bold text-black dark:text-foreground mb-3">🙏 Acknowledgments</h3>
          <p class="text-body mb-4">A special thank you to <strong class="font-semibold text-black dark:text-foreground">Professor Nik Brown</strong> for sharing his expertise and teaching us the art of prompt engineering. His insights, guidance, and innovative approaches have been invaluable in understanding how to effectively communicate with AI models.</p>
          <p class="text-body mb-4">If you're interested in learning more about prompt engineering and AI, be sure to check out Prof. Nik Brown on LinkedIn:</p>
          <a href="https://www.linkedin.com/in/nikbearbrown/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-serif font-semibold">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            Connect with Prof. Nik Brown on LinkedIn
          </a>
        </div>
      </div>
    `,
    date: '2025-01-22',
    readTime: '18 min read',
    category: 'AI',
    author: 'Suhas Reddy'
  }
];

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    if (contentRef.current && post) {
      contentRef.current.innerHTML = post.content;
    }
  }, [post]);

  if (!post) {
    return (
      <>
        <CrazyMenu />
        <main className="pt-16">
          <div className="section-container py-24 text-center">
            <h1 className="text-4xl font-serif font-bold text-black dark:text-foreground mb-4">Post Not Found</h1>
            <button onClick={() => navigate('/blog')} className="minimal-button-outline">
              Back to Blog
            </button>
          </div>
        </main>
      </>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Get related posts (same category, excluding current post)
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter(p => p.id !== post.id && p.category === post.category)
      .slice(0, 3);
  }, [post]);

  return (
    <>
      <CrazyMenu />
      <FloatingActionButton />
      <main className="pt-16">
        <article className="py-16 sm:py-20 md:py-24">
          <div className="section-container max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => navigate('/blog')}
                className="flex items-center gap-2 text-ink-gray dark:text-muted-foreground hover:text-black dark:hover:text-foreground transition-colors font-serif"
              >
                <ArrowLeft size={18} />
                <span>Back to Blog</span>
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200 font-serif text-sm text-black dark:text-foreground"
                aria-label="Go to home"
              >
                <Home size={18} />
                <span>Home</span>
              </button>
            </div>

            <div className="mb-6">
              <span className="text-xs font-serif text-ink-gray dark:text-muted-foreground border border-ink-light-gray/40 dark:border-border px-3 py-1">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-black dark:text-foreground mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-ink-gray dark:text-muted-foreground mb-8 pb-6 border-b border-ink-light-gray/30 dark:border-border">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-ink-light-gray dark:text-muted-foreground" />
                <span className="text-sm font-serif">{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-ink-light-gray dark:text-muted-foreground" />
                <span className="text-sm font-serif">{post.readTime}</span>
              </div>
              <span className="text-sm font-serif">By {post.author}</span>
            </div>

            <div 
              ref={contentRef} 
              className="prose prose-lg max-w-none font-serif blog-content"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif" }}
            >
              {/* Content will be inserted via innerHTML */}
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-8 border-t border-ink-light-gray/30 dark:border-border">
                <h3 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-6">Related Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.id}`}
                      className="paper-card group hover:border-black/40 dark:hover:border-border transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen size={14} className="text-ink-gray dark:text-muted-foreground" />
                        <span className="text-xs font-serif text-ink-gray dark:text-muted-foreground border border-ink-light-gray/40 dark:border-border px-2 py-0.5">
                          {relatedPost.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-serif font-semibold text-black dark:text-foreground mb-2 group-hover:text-ink-gray dark:group-hover:text-muted-foreground transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-ink-gray dark:text-muted-foreground font-serif line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPost;

