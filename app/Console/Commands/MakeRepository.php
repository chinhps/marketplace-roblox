<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeRepository extends Command
{
    protected $signature = 'make:repository {name}';
    protected $description = 'Tạo một repository mới';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $name = $this->argument('name');
        $charToCheck = "\\";

        if (str_contains($name, $charToCheck)) {
            $files = explode("\\", $name);
            $nameBase = $files[count($files) - 1];
            $repositoryName = "{$nameBase}Repository";

            $directoryPath = "";
            for ($i = 0; $i < count($files) - 1; $i++) {
                $directoryPath .= $files[$i] . '/';
            }

            if (!is_dir(app_path("Repository/{$directoryPath}"))) {
                mkdir(app_path("Repository/{$directoryPath}"), 0755, true);
            }

            $repositoryPath = app_path("Repository/{$directoryPath}{$nameBase}Repository.php");
            $interFacePath = app_path("Repository/{$directoryPath}{$nameBase}Interface.php");
            $name = $nameBase;
        } else {
            $repositoryPath = app_path("Repository/{$name}Repository.php");
            $interFacePath = app_path("Repository/{$name}Interface.php");
        }

        if (File::exists($repositoryPath)) {
            $this->error("Repository {$repositoryName} đã tồn tại!");
            return;
        }

        $stubRepository = File::get(base_path('stubs/repository.stub'));
        $stubRepository = str_replace('{{baseName}}', $name, $stubRepository);
        File::put($repositoryPath, $stubRepository);

        $stubInterface = File::get(base_path('stubs/interface.stub'));
        $stubInterface = str_replace('{{baseName}}', $name, $stubInterface);
        File::put($interFacePath, $stubInterface);

        $this->info("Repository {$name} đã được tạo thành công!");
    }
}
