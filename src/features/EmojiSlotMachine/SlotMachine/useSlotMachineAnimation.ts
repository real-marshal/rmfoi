import { randomInt } from '@/utils/number'
import { RefObject, useEffect, useState } from 'react'

// Required to make the scrol speed look similar on different screen resolutions
const SPEED_COEFFICIENT = window.devicePixelRatio

const MIN_COMMON_SPEED = 5 * SPEED_COEFFICIENT

const commonSpeedEquation = (t: number) => (20_000 / (2 * (t + 500))) * SPEED_COEFFICIENT

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const uniqueSpeedEquation = (_t: number, _distanceToTarget: number | null) => 4 * SPEED_COEFFICIENT

const getDistanceToTarget = (scrollPosition: number, targetScrollPosition: number, shift = 0) =>
  Math.abs(scrollPosition - (targetScrollPosition + shift))

const loseStopCondition = (t: number, stoppedSlots: number) =>
  randomInt(0, 10_000) < (stoppedSlots === 0 ? t * 0.1 : 10 ** stoppedSlots + 1 + t / 5)

/**
 *
 * Scrolls columns found by columnElementQuery among the children of the passed ref.
 * If no *wonSlotIndexes* are provided then it uses *loseStopCondition* to decide when columns are stopped.
 * Otherwise, it calculates target scroll positions based on the height of a slot element.
 *
 * To make the illusion of infinite scrolling possible note that:
 * 1. *wonSlotIndexes* should not include indexes of elements which are situated at the end
 * of a column as the algorithm will jump to the start of the column when they are reached.
 * 2. This means the first elements of a column should be the same as the last ones which is achieved
 * by prepending the last few elements to the beginning. This also ensures that won slots will be
 * at the center of a column view even if won indexes are close to 0
 */
export const useSlotMachineAnimation = <T>({
  ref,
  slotsArrays,
  elementsInColumn,
  slotElementQuery,
  columnElementQuery,
}: {
  ref: RefObject<HTMLDivElement>
  slotsArrays: T[][]
  elementsInColumn: number
  slotElementQuery: string
  columnElementQuery: string
}) => {
  const [isBusy, setIsBusy] = useState(false)
  // Current implementation of slot machine animation requires columns to
  // have the same elements at the beginning of a column and at the end of it
  const [prependedSlotsArrays, setPrependedSlotsArrays] = useState(slotsArrays)

  useEffect(() => {
    setPrependedSlotsArrays(
      slotsArrays.map((array) => [...array.slice(-elementsInColumn), ...array])
    )
  }, [elementsInColumn, slotsArrays])

  const startAnimation = (wonSlotIndexes: number[] | undefined) => {
    if (!ref.current) return

    setIsBusy(true)

    const isWon = Boolean(wonSlotIndexes)

    const columnElements = ref.current.querySelectorAll<HTMLDivElement>(columnElementQuery)!
    const slotElement = ref.current.querySelector<HTMLDivElement>(slotElementQuery)!

    const slotElementHeight = slotElement.getBoundingClientRect().height
    const totalSlotElementsHeight = slotElementHeight * slotsArrays[0]!.length

    const targetScrollPositions = wonSlotIndexes?.map((slotIndex) => slotIndex * slotElementHeight)

    const constantShift = slotElementHeight * Math.ceil(elementsInColumn / 2)
    const speeds = new Array<number | null>(columnElements.length).fill(null)

    let startTime: number
    let stoppedSlots = 0
    let commonSpeed = 10

    return new Promise<void>((resolve) => {
      const scroll = (timestamp: DOMHighResTimeStamp) => {
        startTime ??= timestamp

        const timeDelta = timestamp - startTime

        if (stoppedSlots >= columnElements.length) {
          setIsBusy(false)
          return resolve()
        }

        commonSpeed = commonSpeedEquation(timeDelta)

        columnElements.forEach((column, ind) => {
          const speed = speeds[ind] ?? commonSpeed

          if (speed === 0) return

          column.scrollBy(0, speed)

          const winStop =
            isWon &&
            speeds[ind] !== null &&
            getDistanceToTarget(column.scrollTop, targetScrollPositions![ind]!, constantShift) < 5

          const loseStop = !isWon && loseStopCondition(timeDelta, stoppedSlots)

          if (winStop || loseStop) {
            speeds[ind] = 0
            stoppedSlots++
            return
          }

          if (speed <= MIN_COMMON_SPEED) {
            speeds[ind] = uniqueSpeedEquation(
              timeDelta,
              isWon ? getDistanceToTarget(column.scrollTop, targetScrollPositions![ind]!) : null
            )
          }

          // Jump back to the start of the slots list if reached the end
          // To make it smooth the last slots of a column need to also be prepended to the beginning of the column
          if (column.scrollTop >= totalSlotElementsHeight) {
            return column.scrollTo(0, 0)
          }
        })

        requestAnimationFrame(scroll)
      }

      requestAnimationFrame(scroll)
    })
  }

  return { startAnimation, isBusy, prependedSlotsArrays, elementsInColumn }
}
