# Read .env.template and replace all VITE_ variables with __P_VAR__VITE_...__P_VAR__

set -a; eval $(cat .env.template); set +a

tempfile=$(mktemp)

for var in $(env | grep ^VITE_); do
    key=$(echo $var | cut -d '=' -f 1)
    echo $key=__P_VAR__${key}__P_VAR__ >> $tempfile
done

mv $tempfile .env
