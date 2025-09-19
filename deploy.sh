#!/bin/bash

# Build the project
npm run build

# Switch to main branch
git checkout main

# Copy built files to root
cp -r dist/* .

# Add all files
git add .

# Commit changes
git commit -m "Deploy updated portfolio"

# Push to main branch
git push origin main

# Switch back to gh-pages branch
git checkout gh-pages

echo "Deployment complete!"
