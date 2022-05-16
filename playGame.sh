function playMove() {
  local fromTower=$1
  local toTower=$2
  node towerOfHonoi.js $fromTower $toTower
  open towers/towers.html
}

function main() {
  local statusFile=$1

  cp 'resources/initialGameStatus.json' $statusFile
  playMove 1 1

  while grep -q 'false' $statusFile 
  do 
    read -p "Source Destination " fromTower toTower
    playMove $fromTower $toTower
  done
}

main 'resources/gameStatus.json'
