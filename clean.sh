echo "Delete watchmen"
watchman watch-del-all

echo "Delete temporary files"
rm -rf  $TEMPDIR/react-*
rm -rf  $TEMPDIR/npm-*
rm -rf  $TEMPDIR/haste-*
rm -rf  $TEMPDIR/metro-*
rm -rf  $TEMPDIR/haste-map-react-native-packager-*

echo "Clean iOS simulator files"
rm -rf ~/Library/Developer/Xcode/DerivedData/MemberServices-*

echo "Removing node_modules folder"
rm -rf node_modules

echo "Removing package-lock.json file"
rm -f package-lock.json

echo "Removing pods folder"
cd ios && rm -rf pods

echo "Removing Podfile.lock file"
rm -f Podfile.lock && cd ..

echo "NPM - Installing node modules"
npm i

echo "Cocoapod - Installing pods"
cd ios && pod install && cd ..
