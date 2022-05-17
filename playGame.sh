function playMove() {
  local gameFile=$1
  local fromTower=$2
  local toTower=$3
  node $gameFile $fromTower $toTower 
}

function main() {
  local statusFile=$1
  local gameFile='src/towerOfHonoi.js'

  cp 'resources/initialGameStatus.json' $statusFile
  playMove $gameFile 1 1
  open towers/towers.html

  while grep -q 'false' $statusFile
  do 
    read -p "Source Destination " fromTower toTower
    playMove $gameFile $fromTower $toTower
  done
}

main 'resources/gameStatus.json'
