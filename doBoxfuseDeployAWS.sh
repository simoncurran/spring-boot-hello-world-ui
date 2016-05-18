if [ $# -eq 0 ]
  then
    echo "You must supply the environment to deploy to, e.g."
    echo "./doBoxfuseDeployAWS.sh {test|prod}"
fi

env=$1
echo "Environment=$env"

npm shrinkwrap

npm-bundle

boxfuse -env=$env run