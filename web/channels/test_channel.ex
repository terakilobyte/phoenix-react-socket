defmodule Exertion.TestChannel do
  use Exertion.Web, :channel
  import Exertion.MockData
  use GenServer

  def join("tests:lobby", _payload, socket) do
      {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (tests:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  def handle_in("tick", _payload, socket) do
    {:ok, map} = Exertion.MockData.start_link
    Exertion.MockData.set_timer(socket, map)
    {:noreply, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  def tick_out(event, payload, socket) do
    broadcast socket, event, payload
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
