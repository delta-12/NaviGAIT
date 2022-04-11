#!/bin/bash

git pull
git branch -M dev
git add .
read -p "Commit message: " msg
git commit -m "$msg"
git push origin dev
