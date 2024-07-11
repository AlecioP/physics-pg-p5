#!/bin/bash

OSX=$(uname -sr | grep Darwin | wc -l | sed -Ee 's/ //g')
LINUX=$(uname -sr | grep Linux | wc -l | sed -Ee 's/ //g')

if [[ -n $OSX ]];
then
    echo "I am OSX"
    CHROME="/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome"
else
    if [[ -n $LINUX ]];
    then
        echo "I am Linux"
        CHROME="google-chrome"
    else
        echo "Unknown OS. Aborting..."
        exit
    fi
fi
where=$(echo $BASH_SOURCE | sed -Ee 's/run\.sh//g')

RUN="$CHROME  --app=file://${where}index.html"
#echo $RUN
eval $RUN
exit