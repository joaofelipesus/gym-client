# setup e2e seeds
cd /home/joao/Documents/gym-app/gym_api
docker-compose exec app bundle exec rails e2e:setup

# running e2e tests
cd /home/joao/Documents/gym-app/gym-client

if [ -z "$1" ] # check if wasnt passed any argument
  then
    yarn test:e2e 
else
  yarn test:e2e $1
fi

# cleaning development database
cd /home/joao/Documents/gym-app/gym_api
docker-compose exec app bundle exec rails e2e:clean