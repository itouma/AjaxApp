Rails.application.routes.draw do
  get 'posts', to: 'posts#index'
  get 'posts/new', to:'posts#new'
  post 'posts',to: 'posts#create'
end

<%= form_with url: "/posts", method: :post, local: true do |form| %>
  <%= form.text_field :content %>
  <%= form.submit '投稿する' %>
<% end %>