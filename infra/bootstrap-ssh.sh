#!/bin/bash
set -eu

apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y openssh-server

mkdir -p /run/sshd

cat > /etc/ssh/sshd_config.d/00-learning.conf <<'EOF'
PermitRootLogin prohibit-password
PasswordAuthentication no
EOF

ssh-keygen -A
/usr/sbin/sshd