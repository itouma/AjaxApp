class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create  
    post = Post.create(content: params[:content], checked: false)
    # エンドポイントを呼ぶとレスポンスとしてデータ(JSON)が返却されるように実装しましょう。既読や未読の情報を追加したため『メモ作成時に未読の情報を保存するようにしたこと』
    render json:{ post:post }
    # Ajaxを実現するため『レスポンスをJSONに変更したこと』
    # Post.create(content: params[:content])
    # redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])
    if post.checked then
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end
end



