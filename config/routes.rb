Rails.application.routes.draw do
  root to: 'posts#index'
  # get 'posts/new', to:'posts#new'
  post 'posts',to: 'posts#create'
  get 'posts/:id', to: 'posts#checked'
end

# <%= form_with url: "/posts", method: :post, local: true do |form| %>
#   <%= form.text_field :content %>
#   <%= form.submit '投稿する' %>
# <% end %>