#!/bin/zsh

# Bold High Intensity
BIBlack='\033[1;90m'      # Black
BIYellow='\033[1;91m'        # Red
BIGreen='\033[1;92m'      # Green
BIYellow='\033[1;93m'     # Yellow
BIBlue='\033[1;94m'       # Blue
BIPurple='\033[1;95m'     # Purple
BICyan='\033[1;96m'       # Cyan
BIWhite='\033[1;97m'      # White

# Color off
Color_Off='\033[0m'

echo "Delete watchmen"
watchman watch-del-all

echo "Delete temporary files"
rm -rf  $TEMPDIR/react-*
rm -rf  $TEMPDIR/npm-*
rm -rf  $TEMPDIR/haste-*
rm -rf  $TEMPDIR/metro-*
rm -rf  $TEMPDIR/haste-map-react-native-packager-*

echo "${BIYellow}🔸 Cleaning Android files${Color_Off}"
cd android && ./gradlew clean && cd ..
echo "${BIGreen}◆ done${Color_Off}"

echo "${BIYellow}🔸 Cleaning iOS simulator files${Color_Off}"
rm -rf ~/Library/Developer/Xcode/DerivedData/MemberServices-*
echo "${BIGreen}◆ done${Color_Off}"

echo "${BIYellow}🔸 Removing node_modules folder${Color_Off}"
rm -rf node_modules
echo "${BIGreen}◆ done${Color_Off}"

echo "${BIYellow}🔸 Removing package-lock.json file${Color_Off}"
rm -f package-lock.json
echo "${BIGreen}◆ done${Color_Off}"

echo "${BIYellow}🔸 Removing pods folder${Color_Off}"
cd ios && rm -rf pods
echo "${BIGreen}◆ done${Color_Off}"

echo "${BIYellow}🔸 Removing Podfile.lock file${Color_Off}"
rm -f Podfile.lock && cd ..
echo "${BIGreen}◆ done${Color_Off}"

echo "${BIYellow}🔸 Installing node modules (npm)${Color_Off}"
# npm i
npm install --force
echo "${BIGreen}◆ done${Color_Off}"

echo "${BIYellow}🔸 Cocoapod - Installing pods${Color_Off}"
cd ios && pod install && cd ..

echo "${BIGreen}◆◆◆ DONE ◆◆◆${Color_Off}"
