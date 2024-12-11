<?php

namespace App\Events;

use App\Models\User;
use App\Models\Blog;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CommentsEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */

    private $message;
    private $user_id;
    private $id_blog;
    public function __construct( $message, $id_blog, $user_id )
    {
        $this->message = $message; 
        $this->id_blog = $id_blog;
        $this->user_id = $user_id;

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {

        return [
            new Channel('comments-channel.blog.'.$this->id_blog),
        ];
    }

    public function broadcastWith()
    {
        $blog = Blog::find($this->id_blog);
        $user = User::find($this->user_id);

        \Log::info('Broadcasting message with:', ['message' => $this->message, 'blog' => $blog, 'user' => $user]);

        return [
            "message" => $this->message,
            "blog" => $blog,
            "user" => $user 
        ];
    }
}
