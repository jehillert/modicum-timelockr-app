#!/bin/zsh
# * out-of-date source repos which you can update with `pod repo update` or with `pod install --repo-update`.
# CONFIGURATION
PACKAGE_MANAGER="npm"
PROJECT_ROOT=$HOME/dev/dmg-provider
CACHE_TO_DELETE=("haste-*" "metro-*" "yarn-*" "react-*")
DERIVED_DATA_DIR=$HOME/Library/Developer/Xcode/DerivedData

# FORMATTING
BOLD_BLACK="\033[1;90m" # Black
BOLD_RED="\033[1;91m" # Red
BOLD_GREEN="\033[1;92m" # Green
BOLD_YELLOW="\033[1;93m" # Yellow
BOLD_BLUE="\033[1;94m" # Blue
BOLD_PURPLE="\033[1;95m" # Purple
BOLD_CYAN="\033[1;96m" # Cyan
BOLD_WHITE="\033[1;97m" # White

COLOR_OFF="\033[0m"

# FUNCTIONS
say()
{
  echo "$BOLD_YELLOW\n🔸 $1$COLOR_OFF"
}

printDivider()
{
  printf %"$COLUMNS"s |tr " " "•"
}

sayDone()
{
  echo "$BOLD_BLUE🔹 done$COLOR_OFF"
}

announceBig()
{
  echo "$BOLD_RED"
  printDivider
  echo "$BOLD_WHITE🔸🔸🔸 $1 🔸🔸🔸$BOLD_RED"
  printDivider
  echo "$COLOR_OFF"
}

# EXECUTION
announceBig "RUNNING CLEANING SCRIPT"
cd "${PROJECT_ROOT}"

say "Deleting watchmen..."
watchman watch-del-all
sayDone

say "Cleaning temporary files..."
for i in $CACHE_TO_DELETE; do
    echo " Deleting $BOLD_PURPLE\$TMPDIR/$i$COLOR_OFF"
    rm -rf $TMPDIR/$i
done
sayDone

say "Cleaning Android files..."
cd android && ./gradlew clean && cd ..
sayDone

say "Cleaning iOS simulator files..."
rm -rf $DERIVED_DATA_DIR && mkdir $DERIVED_DATA_DIR
sayDone

say "Removing node_modules folder..."
rm -rf node_modules
sayDone

say "Deleting all lock files..."
rm -f yarn-lock.json
rm -f package-lock.json
sayDone

say "Removing pods folder..."
cd ios && rm -rf pods && cd ..
sayDone

say "Removing Podfile.lock file..."
cd ios && rm -f /Podfile.lock && cd ..
sayDone

say "Installing node modules with $PACKAGE_MANAGER..."
if [[ $PACKAGE_MANAGER == "yarn" ]]; then
  $PACKAGE_MANAGER install
fi
if [[ $PACKAGE_MANAGER == "npm" ]]; then
  $PACKAGE_MANAGER install --force
fi
sayDone

say "Cocoapod - Installing cocoapods pods..."
cd ios && pod install && cd ..
sayDone

announceBig "ALL DONE!!!"
