<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UploadFileAPI implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        protected $tempFilePath,
        protected string $newName,
        protected string $oldName
    ) {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $fileContents = Storage::get($this->tempFilePath);
        $response = Http::attach('image', $fileContents, $this->oldName)
            ->post(env('API_SERVER_IMAGE'), [
                'custom_name' => $this->newName,
            ]);
        Log::channel('test')->info($response->json());
        Storage::delete($this->tempFilePath);
    }
}
