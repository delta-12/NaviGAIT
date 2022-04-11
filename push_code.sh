#!/bin/bash

git pull
git branch -M dev
git add .
read -p "Commit message: " msg
echo $msg
read -p "Commit and push code? (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1
git commit -m $msg
git push origin dev
