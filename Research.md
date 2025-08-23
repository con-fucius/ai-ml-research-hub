
# YAML Configuration Files for AI Agent Frameworks, Vector Databases, and Protocols

This report provides detailed YAML configuration examples for each requested system, along with technical explanations and citations of authoritative sources. Each subsection covers a different framework, vector store, or protocol, discussing its key features, advanced capabilities, and showing a representative YAML snippet (which can be adapted as needed) with complete syntax.

## Google Agent Development Kit (ADK)

Google’s **Agent Development Kit (ADK)** is a modular framework for building, testing, and deploying AI agents. ADK is *model-agnostic* and *deployment-agnostic*, supporting custom workflows (sequential, parallel, loop) and LLM-driven agents. It emphasizes multi-agent architectures, rich tool integration, and built-in evaluation. For example, ADK can integrate **MCP** tools and external APIs; one can configure those tools in a YAML “tools.yaml” file as shown in Google’s examples. Below is a sample ADK agent configuration in YAML (pseudo-format), defining an agent name, base model, instructions, and tools. This can serve as a starting point for ADK-based agents:

```yaml
# Example ADK agent configuration (adapt for your own project)
agent:
  name: "bug_report_assistant"
  model: "google/vertex-gemini-2.5"
  description: "Agent to assist with software bug triage"
  instructions: >
    You are a software bug triage assistant. Analyze bug descriptions and assign priorities.
tools:
  - name: "get_current_date"
    type: "builtin.datetime"
  - name: "github_search"
    type: "mcp"
    endpoint: "https://api.github.com/graphql"
memory:
  type: "conversation"
  max_tokens: 2048
```

* **Key Features:** ADK supports custom agent *workflows* and *routing* (e.g. sequential/parallel agents and LlmAgent routing).
* **Multi-Agent:** Agents can be composed hierarchically for specialized tasks.
* **Tools Ecosystem:** ADK integrates with third-party tools (LangChain, CrewAI) and supports standard protocols like MCP.
* **Deployment:** Agents can be containerized and run on Vertex AI, Cloud Run, or Kubernetes.

*(Citations: ADK documentation and blog on tools integration.)*

## OpenAI Agents SDK

The **OpenAI Agents SDK** (Python) is a flexible framework for building LLM-based agents. It supports both OpenAI’s new *Responses API* and legacy *Chat Completions API* models, and can integrate non-OpenAI models via LiteLLM (e.g. Anthropic’s Claude). The SDK allows complex workflows (deterministic flows, loops, etc.) and provides agents with tool support, memory, and tracing. A simplified YAML example below illustrates configuring an OpenAI Agent’s settings (this is illustrative; the SDK itself is configured in code):

```yaml
# Example configuration for an OpenAI Agent
agent:
  name: "weather_bot"
  llm_model: "openai/chatgpt-4o"
  system_prompt: "You are a helpful weather assistant."
tools:
  - name: "get_weather"
    type: "function"
    description: "Fetch current weather for a given location."
  - name: "calc"
    type: "builtin.math"
memory:
  type: "conversation"
  window: 10
```

* **Model Flexibility:** The SDK recommends using `OpenAIResponsesModel` (for the new Responses API) or `OpenAIChatCompletionsModel`. Other providers can be used via LiteLLM with a prefix (e.g. `litellm/anthropic/claude-3.5`).
* **Tool & Memory Support:** Agents can call built-in or custom tools, maintain memory, and use guards/tracing. The SDK is designed for “highly flexible” workflows.
* **Examples:** Code examples show initializing agents and running tasks asynchronously (see OpenAI Agents GitHub for samples).

*(Citations: OpenAI Agents SDK docs on model integration and usage.)*

## Cloudflare Agents SDK

Cloudflare’s **Agents SDK** extends Cloudflare Workers with agent semantics. It provides *persistent state, identity, and concurrency control* via Durable Objects, enabling agents to maintain memory and a static identity. In practice, you embed an OpenAI Agent (for reasoning) inside a Durable Object (for execution and scaling). The SDK allows scheduling, environment variables, and RESTful tool integration. For example, a Cloudflare agent class might use scheduled tasks and vector stores as tools (see Cloudflare docs). YAML itself isn’t the native config format, but here’s an illustrative YAML for a Cloudflare Worker deployment with an agent (using Wrangler):

```yaml
# Example Cloudflare Workers (Agents SDK) deployment configuration
name: "triage-assistant"
main: "src/index.ts"
envs:
  OPENAI_API_KEY: "env"
  VECTOR_DB_URL: "env"
compatibility_date: "2024-12-01"
workers_dev: true
routes:
  - pattern: "example.com/agents/*"
    script: "triage-assistant"
triggers:
  cron:
    - cron: "0 8 * * *"  # Run daily at 8 AM
```

* **Features:** Cloudflare Agents offer *server-side agent placement* and can act as nodes in a multi-agent system. They expose REST endpoints and can handle vector search or scheduling.
* **Integration:** In Cloudflare’s example, an OpenAI Agent (for conversation) runs inside a Durable Object that can call an MCP tool server (e.g. GitHub MCP server).
* **Use Cases:** Agents can represent services on the network (“addressable agents”), enable human-in-the-loop, and implement workflows with persistence.

*(Citations: Cloudflare blog on Agents SDK and example code.)*

## LangChain

**LangChain** is an open-source framework for building LLM applications. It provides abstractions for LLMs, chains, agents, memory, and retrieval, and integrates with hundreds of providers. LangChain simplifies development (with pre-built components), productionization (LangSmith for monitoring), and deployment (LangGraph for agents). Though LangChain itself is Python-based, YAML can be used for configuration (e.g., chains or prompts). An example YAML could define a simple retrieval chain:

```yaml
# Example LangChain workflow configuration (conceptual)
chain:
  type: "RetrievalQA"
  llm_model: "openai/chatgpt-4o"
  retriever: "pinecone_retriever"
  prompt_template: |
    Use the following context to answer the question: {context}
```

* **Capabilities:** LangChain supports chain-of-thought, tool use, memory, and agents (using LangGraph). It implements a standard interface for LLMs and vectors, and handles streaming, callbacks, and evaluation.
* **Extensibility:** LangChain includes integration with many model providers (OpenAI, Azure, Hugging Face, etc.), and has modules for chat history, document loaders, and vector stores.
* **Deployments:** Productionizing LangChain apps is supported via LangSmith (analysis) and LangGraph (production orchestration).

*(Citations: LangChain introduction and architecture.)*

## CrewAI

CrewAI is a **multi-agent framework** for Python. Each *Agent* in CrewAI has a role, goal, and optional tools and memories. CrewAI strongly encourages defining agents via **YAML** configuration, which can then be instantiated at runtime with variable substitution. For example, a `agents.yaml` might look like the snippet below (taken from the CrewAI docs):

```yaml
# src/latest_ai_development/config/agents.yaml (CrewAI)
researcher:
  role: >
    {topic} Senior Data Researcher
  goal: >
    Uncover cutting-edge developments in {topic}
  backstory: >
    You're a seasoned researcher with a knack for uncovering the latest
    developments in {topic}.
writer:
  role: "AI Report Writer"
  goal: "Create a clear report on the research findings."
  backstory: >
    You are meticulous and excel at turning complex information into
    concise summaries.
```

* **Agent Attributes:** As shown, agents have `role`, `goal`, `backstory`, an LLM (e.g. `gpt-4` by default), tools list, and other parameters (max iterations, delegation, etc.).
* **YAML Config:** Using YAML is *recommended* for clarity and maintainability. Variables (like `{topic}`) can be substituted at runtime.
* **Features:** CrewAI agents can collaborate, delegate tasks, and maintain memory. The enterprise edition includes a Visual Agent Builder for no-code agent design.

*(Citations: CrewAI docs on agents and YAML config.)*

## Microsoft AutoGen

**AutoGen** by Microsoft is a programming framework for creating multi-agent AI applications. AutoGen supports autonomous agents or human-in-the-loop, with built-in team patterns. For instance, it provides a *RoundRobinGroupChat* team where agents (like a web surfer and user proxy) communicate in turns. AutoGen also includes a no-code UI (AutoGen Studio) for prototyping workflows. The code-centric framework doesn’t primarily use YAML, but here’s an illustrative snippet of what an AutoGen agent configuration (in YAML) might look like conceptually:

```yaml
# Example conceptual AutoGen config (not from docs)
agents:
  - name: "assistant"
    type: "AssistantAgent"
    model: "openai/chatgpt-4o"
teams:
  - type: "RoundRobinGroupChat"
    agents: ["assistant", "user_proxy"]
    termination: "user_proxy:exit"
```

* **Design:** AutoGen abstracts agents (AssistantAgent, UserProxyAgent, etc.) and teams (RoundRobin, etc.) in Python.
* **Multimodal:** It supports multimodal agents (e.g. a *MultimodalWebSurfer* opening a browser).
* **Studio:** AutoGen Studio provides a UI to design and run workflows without coding.

*(Citations: AutoGen GitHub readme and examples.)*

## Pinecone (Vector Database)

[Pinecone](https://www.pinecone.io) is a fully-managed, cloud-native vector database optimized for similarity search. It makes it “easy to add similarity search to any application”. Pinecone handles automatic sharding, scaling, and provides global low-latency search. It supports hybrid indexes (dense and sparse), and lets you query up to billions of vectors. Below is an example YAML-like configuration for creating a Pinecone index (e.g. via Terraform or a config file):

```yaml
# Example Pinecone index configuration
environment: "us-west1-gcp"
api_key: "YOUR_PINECONE_API_KEY"
index:
  name: "document-embeddings"
  dimension: 1536
  metric: "cosine"
  pod_type: "p1"
```

* **Key Properties:** Pinecone automatically indexes vectors and allows fast k-NN search across massive datasets. It abstracts away infrastructure, so you interact via simple APIs/clients.
* **Use Cases:** Typical use cases include RAG (retrieval-augmented generation), recommendations, semantic search over documents, images, etc. Pinecone’s blogs and docs discuss how to perform nearest-neighbor queries effectively.

*(Citations: Pinecone’s introduction on vector search.)*

## Faiss (Vector Library)

[Faiss](https://github.com/facebookresearch/faiss) (Facebook AI Similarity Search) is an open-source library for efficient similarity search and clustering of dense vectors. Unlike managed DBs, Faiss runs in your environment (CPU/GPU) and is highly optimized for speed and memory. It offers a range of indexes (flat, IVF, HNSW, PQ, etc.) and even GPU-accelerated search. There isn’t a standard YAML config for Faiss, but its usage in Python might be parameterized. For completeness, a pseudo-YAML illustrating index parameters could be:

```yaml
# Example Faiss index configuration (conceptual)
index_type: "IVF"
num_clusters: 10000
metric: "L2"
train_size: 200000
```

* **Performance:** Faiss can index billions of vectors and supports approximate search (which trades a bit of accuracy for huge speedups).
* **GPU Acceleration:** It includes state-of-the-art GPU implementations for many algorithms.
* **Customization:** You choose index type and distance metric. It’s widely used in research and production when self-hosting is acceptable.

*(Citations: Meta’s engineering blog describing Faiss capabilities.)*

## Qdrant

[Qdrant](https://qdrant.tech) is an open-source “AI-native” vector database and semantic search engine. It supports RESTful API access, rich payload filtering, full-text search, and hybrid queries. Qdrant can be configured via YAML files or environment variables. For example, mounting a custom `config.yaml` lets you set log levels, storage paths, and security. An excerpt of such a YAML config might be:

```yaml
# Example Qdrant YAML configuration
log_level: INFO
storage:
  path: "./qdrant_data"
service:
  api_key: "<YOUR_SECRET_KEY>"
  enable_tls: true
tls:
  cert: "./tls/cert.pem"
```

In this example, environment variables `QDRANT__SERVICE__API_KEY` or `QDRANT__TLS__CERT` (as documented) could override these settings. Qdrant also uses a layered config loading (default < config.yaml < env-specific YAML < custom file < env vars).

* **Vector & Search:** Qdrant indexes vectors in collections, each with associated IDs and optional payload (metadata) for filtering. It uses an optimized indexing structure for sublinear search.
* **Scalability:** Open-source Qdrant can be run locally or on Kubernetes; Qdrant Cloud offers a fully managed service. It’s designed for scalability, including clustering and sharding.
* **YAML Config:** Qdrant’s YAML supports all settings (port, timeouts, etc.). The docs emphasize that environment variables prefixed with `QDRANT__` override YAML settings.

*(Citations: Qdrant docs calling it an “AI-native vector database” and describing YAML config.)*

## Weaviate

[Weaviate](https://www.weaviate.io) is a cloud-native, scalable vector database built for AI. It supports vector search, GraphQL queries, and modules for multimodal embeddings. Weaviate’s deployments use YAML (Docker Compose or Kubernetes Helm). For instance, a Docker Compose YAML for Weaviate looks like this:

```yaml
# Sample Weaviate docker-compose.yml (anonymous access)
version: '3.4'
services:
  weaviate:
    image: cr.weaviate.io/semitechnologies/weaviate:1.31.5
    ports:
      - "8080:8080"
      - "50051:50051"
    environment:
      - QUERY_DEFAULTS_LIMIT=25
      - PERSISTENCE_DATA_PATH=/var/lib/weaviate
      - ENABLE_API_BASED_MODULES=true
    volumes:
      - weaviate_data:/var/lib/weaviate
volumes:
  weaviate_data:
```

* **Scalability:** Weaviate is “designed for scalability – handle billions of vector data points efficiently”. It supports multi-replica clustering and zero-downtime updates.
* **Integrations:** It integrates with models like OpenAI, Cohere, Hugging Face, and enables hybrid (vector + metadata) search.
* **Config:** Weaviate configuration (via `docker-compose.yml` or `values.yaml` for Helm) is fully customizable. You can enable authentication/authorization, modules (e.g. Q\&A, generative search), and persistence as shown above.

*(Citations: Weaviate deployment docs highlighting scalability and config options.)*

## Chroma

[Chroma](https://www.trychroma.com) is an open-source embedding database for AI. It supports vector search **and** full-text search over documents with metadata filtering. Chroma can be run locally (e.g. with a Docker YAML config). A snippet from the Chroma Docker docs (conceptually) might look like:

```yaml
# Example Chroma Docker deployment (from docs)
version: '3'
services:
  chroma:
    image: trychroma/chroma:latest
    ports:
      - "8000:8000"
    volumes:
      - chroma_data:/data
volumes:
  chroma_data:
```

* **Features:** Chroma supports multi-modal retrieval (text, images), embedding storage, and provides a Python/JS client. It is optimized for LLM memory and retrieval use cases.
* **Config:** Chroma is “configured using a YAML file” when deployed (as per docs), and you can set data path, ports, cache size, etc. There is also a Chroma Cloud managed option.
* **Use Case:** Commonly used as a vector store in LangChain applications for RAG and long-term memory.

*(Citations: Chroma site describing it as an “open-source search and retrieval database”.)*

## MongoDB (NoSQL + Vector Search)

MongoDB is a NoSQL document database that now includes **Atlas Vector Search** for embedding similarity. Atlas Vector Search lets you “search and index your vector data alongside your other MongoDB data”. You can combine semantic (ANN/ENN) search with traditional queries and full-text search. A sample Kubernetes YAML to deploy MongoDB locally (without vector search) might be:

```yaml
# Example MongoDB deployment on Kubernetes
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
spec:
  replicas: 1
  selector: { matchLabels: { app: mongodb } }
  template:
    metadata:
      labels: { app: mongodb }
    spec:
      containers:
      - name: mongodb
        image: mongo:6.0
        ports:
        - containerPort: 27017
```

* **Vector Search:** Using Atlas, you can create vector indexes on fields (up to 8192 dims) and run nearest-neighbor (ANN/ENN) queries via the MongoDB query language.
* **Hybrid Queries:** Atlas Vector Search supports hybrid queries (combine vector similarity with text filters/queries). This enables RAG use cases within MongoDB.
* **Integration:** MongoDB’s vector search can work with any LLM embeddings. It is often integrated via drivers or frameworks (e.g. MongoDB’s own Node/Python clients).

*(Citations: MongoDB Atlas docs on vector search capability.)*

## Model Context Protocol (MCP)

The **Model Context Protocol (MCP)** (by Anthropic) is an open standard for connecting LLMs with external tools and data. It defines how tools expose structured APIs. In ADK and other frameworks, tools can be published via an MCP server (often configured with a `tools.yaml`). For example, Google’s ADK tutorial shows a `tools.yaml` used by an MCP toolbox:

```yaml
# Example tools.yaml for an MCP server (Google ADK)
sources:
  postgresql:
    kind: cloud-sql-postgres
    project: my-gcp-project
    region: us-central1
    instance: tickets-db-instance
    user: "postgres"
    password: "${POSTGRES_PASSWORD}"
tools:
  search_tickets:
    kind: postgres-sql
    source: postgresql
    description: "Search for tickets similar to a given description."
    parameters:
      - name: query
        type: string
        description: "Query string for semantic search."
    statement: |
      SELECT id, title, description,
        (embedding <=> embedding('text-embedding-002', $1)::vector) AS distance
      FROM tickets
      ORDER BY distance ASC
      LIMIT 5;
```

* **Purpose:** MCP standardizes tool invocation by agents. A tool server (MCP server) uses a YAML like above to define data sources and tools.
* **Integration:** Agent frameworks (ADK, OpenAI Agents, etc.) can create an `MCPToolset` to discover and call such tools dynamically.
* **Examples:** Tools can be simple functions (like date retrieval) or database queries (as shown).

*(Citations: Google ADK blog on using MCP and YAML config.)*

## Agent2Agent Protocol (A2A)

The **Agent2Agent Protocol (A2A)** is an open Google-led standard (announced Apr 2025) for agent-to-agent interoperability. It allows heterogeneous agents to collaborate using JSON-RPC over HTTP/SSE. Agents advertise their capabilities with an **Agent Card** (JSON metadata). Below is a YAML-style example of an Agent Card (roles and capabilities) for A2A:

```yaml
# Example A2A Agent Card (capabilities)
title: "agent-card-search"
description: "Agent card for search capabilities in A2A protocol"
capabilities:
  - "search"
  - "agent2agent"
  - "a2a"
  - "collaboration"
```

* **Discovery:** In A2A, a client agent fetches a “.well-known/agent.json” from a remote agent (the Agent Card) to see what it can do.
* **Protocol:** A2A uses HTTP(S), server-sent events (SSE), and JSON-RPC for communication. It supports multi-modal messages, streaming, and long-running tasks with real-time updates.
* **Principles:** A2A is built on open standards (HTTP/SSE), is secure by default (enterprise auth), and is modality-agnostic. It complements MCP by focusing on agent collaboration (rather than tool invocation).

*(Citations: Google A2A announcement and AgentCard site.)*

## Agent Communication Protocol (ACP)

The **Agent Communication Protocol (ACP)** (by BeeAI) is a RESTful protocol for agent coordination. It defines endpoints for agent discovery and execution. Here is an excerpt of an ACP OpenAPI (YAML) snippet for listing agents and running tasks, taken from the ACP specification:

```yaml
# Part of ACP OpenAPI specification
paths:
  /agents:
    get:
      summary: "List registered agents"
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Agent"
  /runs:
    post:
      summary: "Create and run an agent task"
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/RunCreateBody"
      responses:
        '200':
          description: "Run created"
        '202':
          description: "Run accepted (streaming response)"
```

* **Endpoints:** ACP provides `/agents` for listing agent capabilities, and `/runs` for invoking an agent run.
* **Messaging:** It supports synchronous and asynchronous messaging (with streaming via SSE) and allows tasks to be resumed or canceled.
* **Features:** ACP is framework-agnostic and handles multimodal content. BeeAI’s docs note it supports streaming, multimedia, and is lightweight for easy adoption.

*(Citations: ACP docs stating it “defines a minimal RESTful API for agent communication” and the specification example.)*

**Sources:** The information above is drawn from official documentation and blog posts on each framework or technology. Each code block is a conceptual example inspired by those sources.
