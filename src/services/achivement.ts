import { Checkin } from "@prisma/client";
import prisma from "@src/prisma";
import Logger from "@src/logger";

const logger = new Logger();
logger.setTags(["service", "achievement"]);


const achievementIds = {
  "my-first-checkin": "my-first-checkin", // 1回目のチェックイン: ありぐにゃとごにゃいにゃす！
  "continuous-checkin": "continuous-checkin", // 同じチェックポイントに連続してチェックイン: スルメ
  "dont-exercise-in-a-stairs": "dont-exercise-in-a-stairs", // 1階→8階 or 8階→1階へ連続チェックイン: 階段で運動しないで！
  "floor-master-0": "floor-master-0", // 0階のチェックポイントの8割以上にチェックイン: 0階マスター
  "floor-master-1": "floor-master-1", // 1階のチェックポイントの8割以上にチェックイン: 1階マスター
  "floor-master-2": "floor-master-2", // 2階のチェックポイントの8割以上にチェックイン: 2階マスター
  "floor-master-3": "floor-master-3", // 3階のチェックポイントの8割以上にチェックイン: 3階マスター
  "floor-master-4": "floor-master-4", // 4階のチェックポイントの8割以上にチェックイン: 4階マスター
  "floor-master-5": "floor-master-5", // 5階のチェックポイントの8割以上にチェックイン: 5階マスター
  "floor-master-6": "floor-master-6", // 6階のチェックポイントの8割以上にチェックイン: 6階マスター
  "floor-master-7": "floor-master-7", // 7階のチェックポイントの8割以上にチェックイン: 7階マスター
  "floor-master-8": "floor-master-8", // 8階のチェックポイントの8割以上にチェックイン: 8階マスター
  "food-master": "food-master", // 食事系チェックポイントの8割以上にチェックイン: 食事マスター
  "repeat-checkin-food": "repeat-checkin-food", // 同じ食事系チェックポイントに２回以上チェックイン: クセになる味
  "section1-to-2": "section1-to-2", // セクション1(午前)にチェックインした人がセクション2(午後)にもチェックイン: おはようからこんにちは TODO: セクションを実装してから
  "rapid-checkin": "rapid-checkin", // 前回のチェックインから3分以内にチェックイン: 気分やさん
} as const;

export async function processCheckinAchievement(userId: string, checkpointId: string) {

  let earnedThisCheckinIds: string[] = [];

  const earnedAchievements = await getAchievements(userId).then((achievements) => {
    return achievements.map((achievement) => achievement.achievement_id);
  });

  const checkpoint = await getCheckpoint(checkpointId);

  if (!earnedAchievements.includes(achievementIds["my-first-checkin"])) {
    await processMyFirstCheckin(userId).then((earned) => {
      if (earned) {
        earnedThisCheckinIds.push(achievementIds["my-first-checkin"]);
      }
    });
  }

  if (!earnedAchievements.includes(achievementIds["continuous-checkin"])) {
    await processContinuousCheckin(userId, checkpointId).then((earned) => {
      if (earned) {
        earnedThisCheckinIds.push(achievementIds["continuous-checkin"]);
      }
    });
  }

  if (!earnedAchievements.includes(achievementIds["dont-exercise-in-a-stairs"])) {
    if (checkpoint!.floor === 1 || checkpoint!.floor === 8) {
      // トリガーされたチェックポイントが1階または8階の場合のみ処理
      await processDontExerciseInAStairs(userId, checkpointId).then((earned) => {
        if (earned) {
          earnedThisCheckinIds.push(achievementIds["dont-exercise-in-a-stairs"]);
        }
      });
    }
  }

  if (!earnedAchievements.includes(achievementIds["floor-master-0"])) {
    if (checkpoint!.floor === 0) {
      // トリガーされたチェックポイントが0階の場合のみ処理
      await processFloorMaster(userId, 0).then((earned) => {
        if (earned) {
          earnedThisCheckinIds.push(achievementIds["floor-master-0"]);
        }
      });
    }
  }

  if (!earnedAchievements.includes(achievementIds["floor-master-1"])) {
    if (checkpoint!.floor === 1) {
      // トリガーされたチェックポイントが1階の場合のみ処理
      await processFloorMaster(userId, 1).then((earned) => {
        if (earned) {
          earnedThisCheckinIds.push(achievementIds["floor-master-1"]);
        }
      });
    }
  }

  if (!earnedAchievements.includes(achievementIds["floor-master-2"])) {
    if (checkpoint!.floor === 2) {
      // トリガーされたチェックポイントが2階の場合のみ処理
      await processFloorMaster(userId, 2).then((earned) => {
        if (earned) {
          earnedThisCheckinIds.push(achievementIds["floor-master-2"]);
        }
      });
    }
  }

  if (!earnedAchievements.includes(achievementIds["floor-master-3"])) {
    if (checkpoint!.floor === 3) {
      // トリガーされたチェックポイントが3階の場合のみ処理
      await processFloorMaster(userId, 3).then((earned) => {
        if (earned) {
          earnedThisCheckinIds.push(achievementIds["floor-master-3"]);
        }
      });
    }
  }

  if (!earnedAchievements.includes(achievementIds["floor-master-4"])) {
    if (checkpoint!.floor === 4) {
      // トリガーされたチェックポイントが4階の場合のみ処理
      await processFloorMaster(userId, 4).then((earned) => {
        if (earned) {
          earnedThisCheckinIds.push(achievementIds["floor-master-4"]);
        }
      });
    }
  }

  if (!earnedAchievements.includes(achievementIds["floor-master-5"])) {
    if (checkpoint!.floor === 5) {
      // トリガーされたチェックポイントが5階の場合のみ処理
      await processFloorMaster(userId, 5).then((earned) => {
        if (earned) {
          earnedThisCheckinIds.push(achievementIds["floor-master-5"]);
        }
      });
    }
  }

  if (!earnedAchievements.includes(achievementIds["floor-master-6"])) {
    if (checkpoint!.floor === 6) {
      // トリガーされたチェックポイントが6階の場合のみ処理
      await processFloorMaster(userId, 6).then((earned) => {
        if (earned) {
          earnedThisCheckinIds.push(achievementIds["floor-master-6"]);
        }
      });
    }
  }

  if (!earnedAchievements.includes(achievementIds["floor-master-7"])) {
    if (checkpoint!.floor === 7) {
      // トリガーされたチェックポイントが7階の場合のみ処理
      await processFloorMaster(userId, 7).then((earned) => {
        if (earned) {
          earnedThisCheckinIds.push(achievementIds["floor-master-7"]);
        }
      });
    }
  }

  if (!earnedAchievements.includes(achievementIds["floor-master-8"])) {
    if (checkpoint!.floor === 8) {
      // トリガーされたチェックポイントが8階の場合のみ処理
      await processFloorMaster(userId, 8).then((earned) => {
        if (earned) {
          earnedThisCheckinIds.push(achievementIds["floor-master-8"]);
        }
      });
    }
  }

  if (!earnedAchievements.includes(achievementIds["food-master"])) {
    if (checkpoint!.category === "food_and_drink") {
      // トリガーされたチェックポイントが食事系の場合のみ処理
      await processFoodMaster(userId).then((earned) => {
        if (earned) {
          earnedThisCheckinIds.push(achievementIds["food-master"]);
        }
      });
    }
  }

  if (!earnedAchievements.includes(achievementIds["repeat-checkin-food"])) {
    if (checkpoint!.category === "food_and_drink") {
      // トリガーされたチェックポイントが食事系の場合のみ処理
      await processRepeatCheckinFood(userId, checkpointId).then((earned) => {
        if (earned) {
          earnedThisCheckinIds.push(achievementIds["repeat-checkin-food"]);
        }
      });
    }
  }

  if (!earnedAchievements.includes(achievementIds["rapid-checkin"])) {
    processRapidCheckin(userId).then((earned) => {
      if (earned) {
        earnedThisCheckinIds.push(achievementIds["rapid-checkin"]);
      }
    });
  }
}

async function processMyFirstCheckin(userId: string): Promise<Boolean> {
  return getPreviousCheckin(userId).then((checkin) => {
    console.log(checkin);
    if (checkin === undefined) {
      // 1回目のチェックイン
      handleGetAchievement(userId, achievementIds["my-first-checkin"]);
      return true;
    }
    return false;
  });
}

async function processContinuousCheckin(userId: string, checkpointId: string): Promise<Boolean> {
  return getCheckinCountAtCheckpoint(userId, checkpointId).then((count) => {
    if (count >= 2) {
      // 同じチェックポイントに連続してチェックイン
      handleGetAchievement(userId, achievementIds["continuous-checkin"]);
      return true;
    }
    return false;
  });
}

async function processDontExerciseInAStairs(userId: string, checkpointId: string): Promise<Boolean> {
  return getPreviousCheckin(userId).then((previousCheckin) => {
    if (previousCheckin !== undefined) {
      getCheckpoint(checkpointId).then((triggeredCheckpoint) => {
        if (triggeredCheckpoint!.floor === 1 && previousCheckin.checkpoint.floor === 8) {
          // 1階→8階
          handleGetAchievement(userId, achievementIds["dont-exercise-in-a-stairs"]);
          return true;
        } else if (triggeredCheckpoint!.floor === 8 && previousCheckin.checkpoint.floor === 1) {
          // 8階→1階
          handleGetAchievement(userId, achievementIds["dont-exercise-in-a-stairs"]);
          return true;
        }
      });
    }
    return false;
  });
}

async function processFloorMaster(userId: string, floor: number): Promise<Boolean> {
  return getFloorCheckinRate(userId, floor).then((rate) => {
    if (rate >= 0.8) {
      if (`floor-master-${floor}` in achievementIds) {
        // @ts-ignore-next-line
        handleGetAchievement(userId, achievementIds[`floor-master-${floor}`]);
        return true;
      }
    }
    return false;
  });
}

async function processFoodMaster(userId: string): Promise<Boolean> {
  return getCategoryCheckinRate(userId, "food_and_drink").then((rate) => {
    if (rate >= 0.8) {
      handleGetAchievement(userId, achievementIds["food-master"]);
      return true;
    }
    return false;
  });
}

async function processRepeatCheckinFood(userId: string, checkpointId: string): Promise<Boolean> {
  return getCheckinCountAtCheckpoint(userId, checkpointId).then((count) => {
    if (count >= 2) {
      handleGetAchievement(userId, achievementIds["repeat-checkin-food"]);
      return true;
    }
    return false;
  });
}

async function processRapidCheckin(userId: string): Promise<Boolean> {
  return getPreviousCheckin(userId).then((previousCheckin) => {
    if (previousCheckin !== undefined) {
      if (Date.now() - previousCheckin.checkin_time.getTime() <= 3 * 60 * 1000) {
        handleGetAchievement(userId, achievementIds["rapid-checkin"]);
        return true;
      }
    }
    return false;
  });
}

// Handle getting achievements
async function handleGetAchievement(userId: string, achievementId: string) {
  logger.info(`ユーザー ${userId} が実績 ${achievementId} を獲得しました`);
  return prisma.achievement.create({
    data: {
      user_id: userId,
      achievement_id: achievementId
    }
  });
}

// Utils

// ユーザーの獲得済みアチーブメントを取得
async function getAchievements(userId: string) {
  return prisma.achievement.findMany({
    where: {
      user_id: userId
    }
  });
}

// チェックポイントIDからチェックポイントを取得
async function getCheckpoint(checkpointId: string) {
  return prisma.checkpoint.findFirst({
    where: {
      id: checkpointId
    }
  });
}

// 一つ前のチェックインを取得
async function getPreviousCheckin(userId: string) {
  return prisma.checkin.findMany({
    where: {
      user_id: userId
    },
    include: {
      checkpoint: true
    },
    orderBy: {
      checkin_time: 'desc'
    },
    take: 2
  }).then((checkins) => {
    return checkins[1];
  });
}

// ユーザーの指定フロアチェックイン率を取得
async function getFloorCheckinRate(userId: string, floor: number): Promise<number> {
  return prisma.checkpoint.findMany({
    where: {
      floor
    }
  }).then(async (checkpoints) => {
    // ユニークなチェックポイントIDのセットを取得
    const checkins = await prisma.checkin.findMany({
      where: {
        user_id: userId,
        checkpoint_id: {
          in: checkpoints.map((checkpoint) => checkpoint.id)
        }
      },
      distinct: ['checkpoint_id'] // チェックポイントIDごとに重複を排除
    });
    return checkins.length / checkpoints.length;
  });
}

// ユーザーの指定カテゴリチェックイン率を取得
async function getCategoryCheckinRate(userId: string, category: string): Promise<number> {
  return prisma.checkpoint.findMany({
    where: {
      category
    }
  }).then(async (checkpoints) => {
    // ユニークなチェックポイントIDのセットを取得
    const checkins = await prisma.checkin.findMany({
      where: {
        user_id: userId,
        checkpoint_id: {
          in: checkpoints.map((checkpoint) => checkpoint.id)
        }
      },
      distinct: ['checkpoint_id'] // チェックポイントIDごとに重複を排除
    });
    return checkins.length / checkpoints.length;
  });
}

// 同じチェックポイントにチェックインした回数を取得
async function getCheckinCountAtCheckpoint(userId: string, checkpointId: string): Promise<number> {
  return prisma.checkin.findMany({
    where: {
      user_id: userId,
      checkpoint_id: checkpointId
    }
  }).then((checkins) => {
    return checkins.length;
  });
}
