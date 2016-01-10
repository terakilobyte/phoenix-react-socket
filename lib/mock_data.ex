defmodule Exertion.MockData do
  use GenServer

  @mapvals %{0 => "Description", 1 => "Resources", 2 => "Seed", 3 => "Nothing"}

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, :ok, opts)
  end

  def set_timer(socket, server) do
    :timer.apply_interval(1000, Exertion.MockData, :tick, [socket, server])
  end

  def tick(socket, server) do
    Exertion.TestChannel.tick_out("data", GenServer.call(server, :new_data), socket)
  end

  def init(:ok) do
    {:ok, %{"Description" => 0, "Resources" => 0, "Seed" => 0, "Nothing" => 0}}
  end

  def get_rand() do
    << a :: 32, b :: 32, c :: 32 >> = :crypto.rand_bytes(12)
    :random.seed(a, b, c)
    Float.floor(:random.uniform * 4)
  end

  def handle_call(:new_data, _from, values) do
    newValues = Map.update(values,
                           @mapvals[round(get_rand)],
                           0,
      fn(val) -> val + 1 end)
    {:reply, newValues, newValues}
  end

  def handle_call(:curr_data, _from, values) do
    {:reply, values, values}
  end
end
