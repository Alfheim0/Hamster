

<template>
  <div class="game-container">
    <div class="left-sidebar">
      <button v-for="i in 6" :key="i" class="action-button" @click="console.log(`Левая кнопка ${i} нажата`)">
        кнопка</button>
    </div>

    <div class="center-area">
      <div class="race-track">
        <div v-for="(hamster, index) in hamsters" :key="index" class="track-lane">
          <div class="hamster" :style="{ left: `${hamster.x}px`, backgroundColor: getHamsterColor(index) }" />
        </div>
        <div class="finish-line" :style="{ left: `${FINISH_LINE_X}px` }" />
      </div>
      
      <div class="controls">
        <button v-if="!isRacing && !hasRaceFinished" class="action-button start-button" @click="startRace">
          Старт!</button>
        <button v-if="hasRaceFinished" class="action-button reset-button" @click="resetPositions">
          Вернуться на позиции</button>
      </div>
    </div>

    <div class="right-sidebar">
      <div v-for="(hamster, index) in hamsters" :key="index" class="slot-card">
        <button class="slot-button" @click="console.log(`Слот ${index + 1} выбран`)">
          Слот {{ index + 1 }}
        </button>
        <div class="coefficient">x{{ hamster.coefficient.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 60px);
}

.left-sidebar {
  width: 120px;
  background-color: #8B4513;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.center-area {
  flex: 1;
  background-color: #90EE90;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.right-sidebar {
  width: 120px;
  background-color: #8B4513;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.race-track {
  width: 700px;
  height: 350px;
  background-color: #808080;
  position: relative;
  border: 2px solid #333;
}

.track-lane {
  height: 87.5px;
  width: 100%;
  position: relative;
  border-bottom: 1px solid #666;
}

.hamster {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: left 0.016s linear;
}

.finish-line {
  width: 3px;
  height: 100%;
  background-color: #FF0000;
  position: absolute;
  top: 0;
  border-right: 2px solid #CC0000;
}

.controls {
  margin-top: 20px;
}

.action-button {
  padding: 10px 15px;
  background-color: #FF8C00;
  border: none;
  cursor: pointer;
  font-size: 16px;
  min-width: 20px;
}

.action-button:hover {
  background-color: #FFA500;
}

.start-button {
  background-color: #00AA00;
}

.start-button:hover {
  background-color: #00CC00;
}

.reset-button {
  background-color: #FF6600;
}

.slot-card {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
}

.slot-button {
  padding: 8px;
  background-color: #FF8C00;
  border: none;
  cursor: pointer;
  font-size: 12px;
}

.slot-button:hover {
  background-color: #FFA500;
}

.coefficient {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: #333;
  padding: 4px;
  border-radius: 4px;
}
</style>