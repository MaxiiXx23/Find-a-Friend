import { Levels, Pet, StagesAge } from '@prisma/client'

interface IFilterQueriesProps {
  petsOrg: Pet[]
  age: StagesAge | undefined
  levelEnergy: number | undefined
  size: Levels | undefined
  independence: Levels | undefined
}

export function filterQueries({
  petsOrg,
  age,
  levelEnergy,
  size,
  independence,
}: IFilterQueriesProps) {
  let pets = [...petsOrg]

  if (age) {
    const petsFiltered = pets.filter((pet) => pet.age === age)

    if (!petsFiltered) {
      return
    }

    pets = [...petsFiltered]
  }

  if (levelEnergy) {
    const petsFiltered = pets.filter((pet) => pet.level_energy === levelEnergy)

    if (!petsFiltered) {
      return
    }

    pets = [...petsFiltered]
  }

  if (size) {
    const petsFiltered = pets.filter((pet) => pet.size === size)

    if (!petsFiltered) {
      return
    }

    pets = [...petsFiltered]
  }

  if (independence) {
    const petsFiltered = pets.filter((pet) => pet.independence === independence)

    if (!petsFiltered) {
      return
    }

    pets = [...petsFiltered]
  }

  return pets
}
