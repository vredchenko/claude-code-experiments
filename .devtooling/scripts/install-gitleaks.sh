#!/bin/bash

# Install gitleaks binary for secret scanning
# This script downloads the official gitleaks binary

set -e

GITLEAKS_VERSION="8.21.2"
PLATFORM="linux"
ARCH="x64"
INSTALL_DIR="./node_modules/.bin"
BINARY_NAME="gitleaks"

echo "📦 Installing gitleaks v${GITLEAKS_VERSION}..."

# Create install directory if it doesn't exist
mkdir -p "${INSTALL_DIR}"

# Download gitleaks binary
DOWNLOAD_URL="https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_${PLATFORM}_${ARCH}.tar.gz"

echo "⬇️  Downloading from: ${DOWNLOAD_URL}"
curl -L -o "/tmp/gitleaks.tar.gz" "${DOWNLOAD_URL}"

# Extract and install
echo "📂 Extracting and installing..."
tar -xzf "/tmp/gitleaks.tar.gz" -C "/tmp" 
mv "/tmp/gitleaks" "${INSTALL_DIR}/${BINARY_NAME}"
chmod +x "${INSTALL_DIR}/${BINARY_NAME}"

# Cleanup
rm "/tmp/gitleaks.tar.gz"

echo "✅ Gitleaks installed successfully!"
echo "📍 Location: ${INSTALL_DIR}/${BINARY_NAME}"

# Test installation
if "${INSTALL_DIR}/${BINARY_NAME}" version > /dev/null 2>&1; then
    echo "🧪 Installation verified!"
    "${INSTALL_DIR}/${BINARY_NAME}" version
else
    echo "❌ Installation verification failed"
    exit 1
fi