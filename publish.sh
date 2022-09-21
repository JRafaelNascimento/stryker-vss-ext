#!/bin/bash

# Clean
rm -rf dist

# Copy files
mkdir -p dist
cp -r {src,images} dist
cp {*.json,*.md} dist

# Install Dependencies
cd dist
npm install 

# Compile Typescript
tsc 

# Create Artifact
tfx extension create