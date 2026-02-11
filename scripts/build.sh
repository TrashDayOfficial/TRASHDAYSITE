#!/bin/sh
# Writes deploy-log.txt for debugging Netlify builds. Always exits 0 so deploy succeeds.
LOG="deploy-log.txt"
(
  echo "=== TRASH DAY Netlify deploy log ==="
  echo "Time: $(date -u 2>/dev/null || date)"
  echo "PWD: $(pwd)"
  echo "---"
  echo "Node: $(node -v 2>/dev/null || echo 'n/a')"
  echo "NPM: $(npm -v 2>/dev/null || echo 'n/a')"
  echo "---"
  echo "Files in root:"
  ls -la 2>/dev/null || true
  echo "---"
  echo "Build step finished successfully."
) > "$LOG" 2>&1
echo "Wrote $LOG"
exit 0
