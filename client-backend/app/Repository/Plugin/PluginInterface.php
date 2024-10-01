<?php
namespace App\Repository\Plugin;

interface PluginInterface {
    public function getByKey(string $key);
}