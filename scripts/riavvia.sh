#!/usr/bin/env bash
# Riavvia il server di produzione locale sulla porta 3210, aspettando davvero che la porta si
# liberi: un `next start` partito mentre il vecchio processo è ancora vivo continua a servire il
# build precedente e fa misurare numeri di un'altra versione.
set -u
PORTA=${1:-3210}
LOG=${2:-/tmp/next-$PORTA.log}

for pid in $(ss -ltnp 2>/dev/null | grep ":$PORTA " | grep -o 'pid=[0-9]*' | cut -d= -f2 | sort -u); do
  kill "$pid" 2>/dev/null
done

for _ in $(seq 1 30); do
  ss -ltn 2>/dev/null | grep -q ":$PORTA " || break
  sleep 0.5
done
if ss -ltn 2>/dev/null | grep -q ":$PORTA "; then
  echo "porta $PORTA ancora occupata: non riavvio" >&2
  exit 1
fi

(npm run start >"$LOG" 2>&1 &)

for _ in $(seq 1 40); do
  sleep 0.5
  if [ "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORTA/")" = "200" ]; then
    echo "server pronto su http://127.0.0.1:$PORTA"
    exit 0
  fi
done
echo "il server non ha risposto: vedi $LOG" >&2
exit 1
