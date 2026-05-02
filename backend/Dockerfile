# Use stable Python (NOT 3.14)
FROM python:3.11-slim

# Prevent Python from writing .pyc files & enable logs immediately
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies (minimal)
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip (important for wheels)
RUN pip install --upgrade pip setuptools wheel

# Copy requirements first (for caching)
COPY requirements.txt .

# Force binary installs (NO Rust builds)
RUN pip install --no-cache-dir --only-binary=:all: -r requirements.txt

# Copy project files
COPY . .

# Expose port (Render / Docker standard)
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0","--port","10000"]