Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # global options responder -> makes sure OPTION request for CORS endpoints work
  # match '*path', via: [:options], to: lambda {|_| [204, { 'Content-Type' => 'text/plain' }]}

  namespace :api do
    namespace :v1 do
      resources :choices
      resources :people
      resources :scenarios
      resources :users
    end
  end
end
