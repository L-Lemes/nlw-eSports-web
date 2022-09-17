import { FormEvent, useEffect, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import axios from 'axios'

import { Check, GameController, CaretDown } from 'phosphor-react'

import { Input } from './Form/input'

interface Game {
  id: string
  title: string
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [game, setGame] = useState<string>('')
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

  useEffect(() => {
    axios('http://localhost:3333/games').then(response =>
      setGames(response.data)
    )
  }, [])

  console.log(game)

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    try {
      await axios.post(`http://localhost:3333/games/${game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(weekDay => Number(weekDay)),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert('Anúncio criado com sucesso')
    } catch (err) {
      console.log(err)
      alert('Erro ao criar Anúncio')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#202026] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/50">
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>

          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game ?
              </label>
              <div
                id="divContainer"
                className="bg-zinc-900 py-3 px-4 rounded text-sm relative "
              >
                <Select.Root onValueChange={setGame}>
                  <Select.Trigger
                    aria-label="games"
                    className="flex justify-between w-full text-white"
                  >
                    <Select.Value placeholder={'selecione um jogo'} />
                    <Select.Icon className="mt-1">
                      <CaretDown />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal className="w-[400px] mt-14 max-h-full bg-zinc-900">
                    <Select.Content>
                      <Select.Viewport className="flex flex-col gap-4 p-4 fixed">
                        {games.map(game => {
                          return (
                            <Select.Item
                              key={game.id}
                              value={game.id}
                              className="cursor-pointer text-white"
                            >
                              <Select.ItemText>{game.title}</Select.ItemText>
                            </Select.Item>
                          )
                        })}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                id="name"
                name="name"
                placeholder="Como te chamam dentro do jogo ?"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos ?</label>
                <Input
                  name="yearsPlaying"
                  id="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual é o seu Discord ?</label>
                <Input id="discord" name="discord" placeholder="user#0000" />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Quando costuma jogar ?</label>
                <ToggleGroup.Root
                  className="grid grid-cols-4 gap-2"
                  type="multiple"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    title="Domingo"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    title="Segunda"
                    value="1"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    title="Terça"
                    value="2"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    title="Quarta"
                    value="3"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    title="Quinta"
                    value="4"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    title="Sexta"
                    value="5"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    title="Sábado"
                    value="6"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horário do dia ?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="time"
                    name="hourStart"
                    id="hourStart"
                    placeholder="De"
                    className="appearance-none"
                  />
                  <Input
                    type="time"
                    name="hourEnd"
                    id="hourEnd"
                    placeholder="Até"
                    className="appearance-none"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 items-center flex gap-2 text-sm">
              <Checkbox.Root
                className="w-6 h-6 p-1 rounded bg-zinc-900"
                checked={useVoiceChannel}
                onCheckedChange={checked =>
                  checked === true
                    ? setUseVoiceChannel(true)
                    : setUseVoiceChannel(false)
                }
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar no chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                Cancelar
              </Dialog.Close>
              <button
                className=" flex items-center gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600"
                type="submit"
              >
                <GameController size={24} /> Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}
