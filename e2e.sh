# setup e2e seeds
cd /home/joaofelipe/Documents/gym-app/gym_api
docker-compose exec app bundle exec rails e2e:setup

# running e2e tests
cd /home/joaofelipe/Documents/gym-app/gym_client

if [ -z "$1" ]
  then
    yarn test:e2e $1
else
  yarn test:e2e
fi


# cleaning development database
cd /home/joaofelipe/Documents/gym-app/gym_api
docker-compose exec app bundle exec rails e2e:clean