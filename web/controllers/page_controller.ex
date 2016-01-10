defmodule Exertion.PageController do
  use Exertion.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
